const events = require('events');
const rpc = require('../rpc');
const logger = require('../log');
const db = require('../db');
const config = require('../config');
const scratchpad = require('./scratchpad');
const crypto = require('crypto');
const cnUtil = require('cryptonote-util');
const instanceId = crypto.randomBytes(4);

const blockTemplateCount = 3;
var currentBlockTemplate;
var validBlockTemplates = [];
var newBlockTemplate = new events.EventEmitter();

var currentShares = {};
var startTime;
var endTime;
var lastBlock;

class BlockTemplate {
    constructor(template) {
        this.blob = template.blocktemplate_blob;
        this.difficulty = template.difficulty;
        this.height = template.height;
        this.reserveOffset = template.reserved_offset;
        this.buffer = Buffer.from(this.blob, 'hex');
        instanceId.copy(this.buffer, this.reserveOffset + 4, 0, 3);
        this.previousBlockHash = Buffer.alloc(32);
        this.buffer.copy(this.previousBlockHash, 0, 7, 39);
        this.extraNonce = 0;
    };

    static notifier() {
        return newBlockTemplate;
    };

    static current() {
        return currentBlockTemplate;
    };

    static validBlocks() {
        return validBlockTemplates;
    };

    static lastBlockTime() {
        return lastBlock;
    };

    static currentHashRate() {
        let time = (new Date() - startTime) / 1000;
        return Math.round(BlockTemplate.getTotalShares() / time);
    };

    static getTotalShares() {
        let sum = 0;
        Object.keys(currentShares).forEach(minerId => {
            sum += currentShares[minerId].score;
        });
        return sum;
    }

    static async storeCandidate(miner, job, hash, height) {
        BlockTemplate.addMinerShare(miner, job);
        lastBlock = endTime = new Date();
        let blockHeader = await BlockTemplate.getBlockHeader(height);
        if (blockHeader) {
            let totalShares = BlockTemplate.getTotalShares();
            db.storeCandidate(blockHeader, totalShares, hash, startTime, endTime);
            db.storeRoundShares(height, currentShares, startTime, endTime);
            clearRound();
        }
    };

    static addMinerShare(miner, job) {
        job.score = job.difficulty;
        //later PPLNS
        UpdateShares(miner.account, job.score, job.difficulty, new Date());
    }

    static async refresh() {
        let response = await rpc.getBlockTemplate('');
        if (response.error) {
            logger.error('Unable to get block template');
            return;
        }

        if (!currentBlockTemplate) {
            PushBlockTemlate(response.result);
        } else if (!currentBlockTemplate.hashEquals(response.result)) {
            if (validBlockTemplates.push(currentBlockTemplate) > blockTemplateCount) {
                validBlockTemplates.shift();
            }
            PushBlockTemlate(response.result);
        }
    };

    static async getBlockHeader(height = null) {
        var response;
        if (height) {
            response = await rpc.getBlockHeaderByHeight(height);
        } else {
            response = await rpc.getLastBlockHeader();
        }
        if (response.error) {
            logger.error('Error receiving block header');
            return null;
        }
        return response.result.block_header;
    }

    nextBlob() {
        this.buffer.writeUInt32BE(++this.extraNonce, this.reserveOffset);
        return cnUtil.convert_blob_bb(this.buffer).toString('hex');
    };

    hashEquals(template) {
        let buffer = Buffer.from(template.blocktemplate_blob, 'hex');
        let previousBlockHash = Buffer.alloc(32);
        buffer.copy(previousBlockHash, 0, 7, 39);
        return (previousBlockHash.toString('hex') == this.previousBlockHash.toString('hex'));
    };
}

function PushBlockTemlate(template) {
    currentBlockTemplate = new BlockTemplate(template);
    logger.log(`New block template loaded with height: ${currentBlockTemplate.height}, diff: ${currentBlockTemplate.difficulty}`);
    startTime = new Date();
    scratchpad.getFullScratchpad();
    newBlockTemplate.emit('NewTemplate');
    UnlockBlocks();
}

async function UnlockBlocks() {
    let unlockHeight = currentBlockTemplate.height - config.pool.block.unlockDepth;

    let blockCandidates = await db.getCandidates(unlockHeight);
    if (blockCandidates.length === 0) {
        return;
    }

    for (let blockCandidate of blockCandidates) {
        let blockHeader = await BlockTemplate.getBlockHeader(blockCandidate.height);
        if (blockHeader) {
            let logBalance = blockHeader.reward / config.pool.payment.units;
            orphan = blockHeader.hash != blockCandidate.hash;
            logger.log(`Unlocking block ${blockCandidate.height} with reward of ${logBalance} BBR (orphan: ${orphan})`);
            let shares = await db.getShares(blockCandidate.height);
            if (orphan) {
                shares.forEach(share => {
                    UpdateShares(share.miner, share.score, share.shares, new Date());
                });
            } else {
                let feePercent = config.pool.fee / 100;
                let reward = Math.round(blockHeader.reward - (blockHeader.reward * feePercent));
                var rewardList = [];
                shares.forEach(share => {
                    let percent = share.score / blockCandidate.shares;
                    let workerReward = Math.round(reward * percent);
                    rewardList.push({
                        updateOne: {
                            filter: { 'miner': share.miner },
                            update: { $inc: { 'balance': workerReward } },
                            upsert: true
                        }
                    });
                });
                db.storeBlockRewards (rewardList);
            }
            db.unlockBlock(blockCandidate.height, orphan);
        }
    }
}

function clearRound() {
    endTime = startTime = null;
    Object.keys(currentShares).forEach(minerId => {
        delete currentShares[minerId];
    });
}

function UpdateShares(miner, score, shares, timeStamp) {
    if (currentShares.hasOwnProperty(miner)) {
        currentShares[miner].score += score;
        currentShares[miner].shares += shares;
        currentShares[miner].timeStamp = timeStamp;
    } else {
        currentShares[miner] = {
            score: score,
            shares: shares,
            timeStamp: timeStamp
        }
    }
}

module.exports = BlockTemplate;