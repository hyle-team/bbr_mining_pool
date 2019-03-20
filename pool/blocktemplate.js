const events = require('events');
const rpc = require('../rpc');
const logger = require('../log');
const config = require('../config');
const scratchpad = require('./scratchpad');
const alias = require('./alias');
const crypto = require('crypto');
const crUtil = require('currency-util');
const instanceId = crypto.randomBytes(4);

const blockTemplateCount = 3;
var currentBlockTemplate;
var validBlockTemplates = [];
var newBlockTemplate = new events.EventEmitter();

var info = {};
info.last_block_hash = '';
info.tx_count = -1;

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
    }

    static notifier() {
        return newBlockTemplate;
    }

    static current() {
        return currentBlockTemplate;
    }

    static validBlocks() {
        return validBlockTemplates;
    }

    static getInfo() {
        return info;
    }

    static async refresh() {
        let res = await rpc.getInfo();
        if (res.error || res.result.status !== 'OK') {
            logger.error('Unable to get blockchain info', JSON.stringify(res.error));
        } else {
            if ((res.result.last_block_hash != info.last_block_hash) ||
                res.result.tx_count > info.tx_count) {
                let nextAlias = await alias.getCurrent();
                let response = await rpc.getBlockTemplate(nextAlias);
                if (response.error) {
                    logger.error('Unable to get block template', JSON.stringify(response.error));
                    response = await rpc.getBlockTemplate('');
                    if (response.error) {
                        logger.error('Unable to get on second attempt', JSON.stringify(response.error));
                        return;
                    }
                }

                if (currentBlockTemplate &&
                    validBlockTemplates.push(currentBlockTemplate) > blockTemplateCount) {
                    validBlockTemplates.shift();
                }
                PushBlockTemlate(response.result);
            }
            info = res.result;
        }
    }

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
        return crUtil.convert_blob(this.buffer).toString('hex');
    }

    hashEquals(template) {
        let buffer = Buffer.from(template.blocktemplate_blob, 'hex');
        let previousBlockHash = Buffer.alloc(32);
        buffer.copy(previousBlockHash, 0, 7, 39);
        return (previousBlockHash.toString('hex') == this.previousBlockHash.toString('hex'));
    }
}

function PushBlockTemlate(template) {
    currentBlockTemplate = new BlockTemplate(template);
    logger.log(`New block template loaded with height: ${currentBlockTemplate.height}, diff: ${currentBlockTemplate.difficulty}`);
    startTime = new Date();
    scratchpad.getFullScratchpad();
    newBlockTemplate.emit('NewTemplate');
}

module.exports = BlockTemplate;