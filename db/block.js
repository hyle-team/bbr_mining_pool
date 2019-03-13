const logger = require('../log');
const config = require('../config');
const rpc = require('../rpc');
const Redis = require('ioredis');
const redis = new Redis();

redis.set('pool:round:start', '0-0');

async function storeMinerShare(candidate, height, account, worker, share, score) {
    let res = await redis.xadd('hashes', '*', [
        'height', height,
        'account', account,
        'worker', worker,
        'share', share,
        'score', score
    ]);
    if (candidate) {
        await redis.set('pool:round:stop', res);
    }
}

async function storeCandidate(header, hash) {
    let roundStop = await redis.get('pool:round:stop');
    let nextStart = roundStop.split('-');
    nextStart[1]++;
    let roundStart = await redis.getset('pool:round:start', nextStart.join('-'));

    let hashes = await redis.xrevrange('hashes', roundStop, roundStart);
    logger.debug('hashes', JSON.stringify(hashes));

    let sumShares = 0;
    let sumScore = 0;
    let accountScore = {};
    let commands = [];

    for (let i = 0, hLen = hashes.length; i < hLen; i++) {
        let entry = hashes[i][1];
        sumShares += parseFloat(entry[7]);
        sumScore += parseFloat(entry[9]);

        if (accountScore[entry[3]]) {
            accountScore[entry[3]].shares += parseFloat(entry[7]);
            accountScore[entry[3]].score += parseFloat(entry[9]);
        }
        else {
            accountScore[entry[3]] = {
                shares: parseFloat(entry[7]),
                score: parseFloat(entry[9])
            }
        }
    }

    for (let account in accountScore) {
        let score = accountScore[account].score;
        let shares = accountScore[account].shares;
        commands.push(['sadd', 'shares:' + header.height, [account, shares, score].join(':')]);
        commands.push(['hincrby', 'miners:' + account, 'total-shares', shares]);
    }

    let candidate = {
        difficulty: header.difficulty,
        hash: hash,
        reward: header.reward,
        shares: sumShares,
        score: sumScore,
        startTime: roundStart.split('-')[0],
        endTime: roundStop.split('-')[0]
    }
    commands.push(['hmset', 'candidates:' + header.height, candidate]);

    await redis.pipeline(commands).exec();
}

async function unlock(unlockHeight) {
    let candidates = await redis.keys('candidates:*');
    for (let i = 0, cLen = candidates.length; i < cLen; i++) {
        let height = parseInt(candidates[i].split(':')[1]);
        if (height <= unlockHeight) {
            let block = await redis.hgetall(candidates[i]);
            let getHeader = await rpc.getBlockHeaderByHeight(height);
            if (!getHeader.error) {
                let header = getHeader.result.block_header;
                let logBalance = header.reward / config.pool.payment.units;
                let commands = [];
                let status = 'confirmed';
                orphan = header.hash != block.hash;
                logger.log(`Unlocking block ${height} with reward of ${logBalance} BBR (orphan: ${orphan})`);
                
                var shares = await redis.smembers('shares:' + height);
                if (orphan) {
                    status = 'orphan';
                    for (let i = 0, sLen = shares.length; i < sLen; i++) {
                        let share = shares[i].split(':');
                        storeMinerShare(false, height, share[0], '', share[1], share[2]);
                    }
                } else {
                    let feePercent = config.pool.fee / 100;
                    let totalReward = Math.round(header.reward - (header.reward * feePercent));
                    
                    for (let i = 0, sLen = shares.length; i < sLen; i++) {
                        let share = shares[i].split(':');
                        let percent = share[2] / block.score;
                        let reward = Math.round(totalReward * percent);
                        commands.push(['zincrby', 'balances', reward, share[0]]);
                    }
                }
                commands.push(['del', 'shares:' + height]);
                commands.push(['rename', 'candidates:' + height, 'blocks:' + height]);
                commands.push(['hset', 'blocks:' + height, 'status', status]);
                await redis.pipeline(commands).exec();
            }
        }
    }
}

module.exports = {
    storeMinerShare: storeMinerShare,
    storeCandidate: storeCandidate,
    unlock: unlock
}