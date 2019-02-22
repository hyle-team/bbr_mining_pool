const multiHashing = require('multi-hashing');
const cnUtil = require('cryptonote-util');
const rpc = require('../rpc');
const config = require('../config');
const logger = require('../log');
const BlockTemplate = require('./blocktemplate');
const scratchpad = require('./scratchpad');
const bignum = require('bignum');

const diffOne = bignum('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);
const noncePattern = new RegExp("^[0-9a-f]{8}$");

async function validateShare(miner, params, reply) {
    var job = miner.validJobs.find(function (job) { return job.id === params.job_id; });
    if (!job) {
        reply('Invalid job id');
        logger.log('Invalid job id');
        return false;
    }

    params.nonce = params.nonce.substr(0, 8).toLowerCase();
    if (!noncePattern.test(params.nonce)) {
        updateStats(miner, false);
        reply('Invalid nonce');
        logger.log('Invalid nonce');
        return false;
    }

    if (job.submissions.includes(params.nonce)) {
        updateStats(miner, false);
        reply('Duplicate share');
        logger.log('Duplicate share');
        return false;
    }
    job.submissions.push(params.nonce);

    const current = BlockTemplate.current();
    const blockTemplate = current.height === job.height ? current
        : BlockTemplate.validBlocks().find((t) => { return t.height === job.height; });

    if (!blockTemplate) {
        reply('Block expired');
        logger.log('Block expired');
        return false;
    }

    let shareBuffer = Buffer.alloc(blockTemplate.buffer.length);
    blockTemplate.buffer.copy(shareBuffer);
    shareBuffer.writeUInt32BE(job.extraNonce, blockTemplate.reserveOffset);
    if (typeof (params.nonce) === 'number' && params.nonce % 1 === 0) {
        let nonceBuf = bignum(params.nonce, 10).toBuffer();
        let bufReversed = Buffer.from(nonceBuf.toJSON().reverse());
        bufReversed.copy(shareBuffer, 1);
    } else {
        Buffer.from(params.nonce, 'hex').copy(shareBuffer, 1);
    }

    let convertedBlob = cnUtil.convert_blob_bb(shareBuffer);
    let hash = multiHashing.boolberry(convertedBlob, scratchpad.current.buffer, job.height);

    if (hash.toString('hex') !== params.result) {
        logger.log('Bad hash from miner ' + miner.account + '@' + miner.address +
            '\n scratchpad.height=' + scratchpad.current.height + ', job.height=' + job.height +
            '\n calculated hash: ' + hash.toString('hex') + ', transfered hash: ' + params.result);
        reply('Bad hash');
        return false;
    }

    updateStats(miner, true);

    let hashArray = hash.toByteArray().reverse();
    let hashNum = bignum.fromBuffer(Buffer.from(hashArray));
    let hashDiff = diffOne.div(hashNum);

    logger.log(`Share with diff ${hashDiff} when block diff is ${current.difficulty} from ${miner.account}`);
    if (hashDiff.ge(current.difficulty)) {
        let response = await rpc.submitBlock([shareBuffer.toString('hex')]);
        if (response.error) {
            logger.error('Error submitting block:', JSON.stringify(response.error));
            BlockTemplate.addMinerShare(miner, job);
        } else {
            logger.log('BLOCK SUBMITED', JSON.stringify(response.result));
            const cryptoNight = multiHashing['cryptonight'];
            let blockFastHash = cryptoNight(Buffer.concat([Buffer.from([convertedBlob.length]), convertedBlob]), true).toString('hex');
            BlockTemplate.storeCandidate(miner, job, blockFastHash, current.height);
            //process alias queue
        }
    } else if (hashDiff.lt(job.difficulty) && (hashDiff / job.difficulty) < 0.995) {
        logger.log('Block rejected due low diff, found by', miner.account);
        sendReply('Low difficulty share');
        return false;
    } else {
        BlockTemplate.addMinerShare(miner, job);
    }
    return true;
}

function getTargetHex(miner) {
    let padded = Buffer.alloc(32);
    padded.fill(0);

    let diffBuff = diffOne.div(miner.difficulty).toBuffer();
    diffBuff.copy(padded, 32 - diffBuff.length);

    let buff = padded.slice(0, 4);
    let buffArray = buff.toByteArray().reverse();
    let buffReversed = Buffer.from(buffArray);
    miner.target = buffReversed.readUInt32BE(0);
    let hex = buffReversed.toString('hex');
    return hex;
}

function retargetDifficulty(miner, jobId) {
    if (miner.validJobs.length === 0)
        return;

    let job = miner.validJobs[miner.validJobs.length - 1];
    if (job.id === jobId) {
        let time = Date.now();
        let retarget = false;

        if (time - job.timeStamp < config.pool.share.targetTime - config.pool.share.targetTimeSpan) {
            miner.difficulty = Math.round(miner.difficulty * 1.1);
            retarget = true;
            miner.timeStamp = time;

        } else if (time - job.timeStamp > config.pool.share.targetTime + config.pool.share.targetTimeSpan) {
            miner.difficulty = Math.round(miner.difficulty * 0.9);
            retarget = true;
        }

        if (retarget) {
            var newJob = miner.getJob().job;
            miner.pushMessage('job', newJob);
            jobId = newJob.job_id;
            logger.log(`${time - job.timeStamp} msecs from last share, new miner diff set to ${miner.difficulty} for ${miner.account}`);
        } else {
            logger.log(`${time - job.timeStamp} msecs from last share, continue with current diff for ${miner.account}`);
            job.timeStamp = time;
            miner.timeStamp = time;
        }

        setTimeout(() => {
            retargetDifficulty(miner, jobId);
        }, config.pool.share.targetTime + config.pool.share.targetTimeSpan + 1000);
    }
}

function updateStats(miner, valid) {
    let banPercent = config.pool.ban.percent / 100;
    if (banPercent <= 0) return;

    let stats = miner.getBanStats();
    if (!stats.perIP[miner.address]) {
        stats.perIP[miner.address] = { valid: 0, invalid: 0 };
    }
    var minerShares = stats.perIP[miner.address];
    (valid) ? minerShares.valid++ : minerShares.invalid++;

    logger.log('STATS', JSON.stringify(minerShares));

    if (minerShares.valid + minerShares.invalid >= config.pool.ban.checkpoint) {
        if (minerShares.invalid / minerShares.valid >= banPercent) {
            logger.log('Miner banned', miner.address, ':', miner.account);
            stats.bannedMiners[miner.address] = Date.now();
            miner.remove();
        } else {
            minerShares.invalid = minerShares.valid = 0;
        }
    }
}

exports.getTargetHex = getTargetHex;
exports.retarget = retargetDifficulty;
exports.validate = validateShare;