const logger = require('../log');
const rpc = require('../rpc');
const config = require('../config');
const Redis = require('ioredis');
const redis = new Redis();

const units = config.pool.payment.units;

async function getLastBlocks(count = null, offset = '0') {
    let candidateList = await redis.keys('candidates:*');
    candidateList.sort();
    candidateList.reverse();
    let blockList;
    if (count) {
        blockList = await redis.zrevrangebyscore(
            'pool:block-list', '+inf', '-inf',
            ['LIMIT', offset, count]);
    } else {
        blockList = await redis.zrevrangebyscore('pool:block-list', '+inf', '-inf');
    }

    let commands = [];
    for (let i = 0, length = candidateList.length; i < length; i++) {
        commands.push(['hgetall', candidateList[i]]);
    }
    for (let i = 0, length = blockList.length; i < length; i++) {
        commands.push(['hgetall', blockList[i]]);
    }
    let blocks = await redis.pipeline(commands).exec();
    for (let i = 0, length = blocks.length; i < length; i++) {
        blocks[i].shift();
        blocks[i][0].reward /= units;
    }

    return blocks;
}

async function getLastTransactions(account, timeStamp = '0') {
    let tx = await redis.xrevrange(
        'transactions:' + account,
        Date.now(), timeStamp);

    for (let i = 0, length = tx.length; i < length; i++) {
        let time = parseInt(tx[i][0].split('-')[0]);
        tx[i][0] = new Date(time).toUTCString();
        tx[i][1][1] /= units;
    }
    return tx;
}

async function getBalance(account) {
    let balance = await redis.zscore('balances', account);
    return balance / units;
}

async function getDashboard() {
    let promises = [];
    promises.push(rpc.getInfo());
    promises.push(rpc.getLastBlockHeader());
    promises.push(getCurrentPoolStats());
    let data = await Promise.all(promises);
    let info = data[0];
    let header = data[1];
    let pool = data[2];

    let network = {};

    if (info.result) {
        info = info.result;
        network.current_hasrate = info.current_network_hashrate_50;
        network.difficulty = info.difficulty;
        network.height = info.height;
        network.last_hash = info.last_block_hash;
    }
    if (header.result) {
        network.last_reward = header.result.block_header.reward / units;
        network.last_block_found = Math.round(Date.now() / 1000 - header.result.block_header.timestamp);
    }

    pool.effort = Math.round(100 * pool.round_shares / info.difficulty);

    return {
        network: network,
        pool: pool
    }
}

async function getCurrentPoolStats () {
    let now = Date.now();
    let timeDepth = now - config.pool.stats.frame;
    let roundStart = await redis.get('pool:round:start');
    roundStart = (roundStart) ? roundStart.split('-')[0] : 0;
    let hashesDepth = Math.min(roundStart, timeDepth);
    let hashes = await redis.xrevrange('hashes', now, hashesDepth);
    let sumShares = roundShares = 0;
    let accounts = {};

    for (let i = 0, length = hashes.length; i < length; i++) {
        let timeStamp = hashes[i][0].split('-')[0];
        let entry = hashes[i][1];
        sumShares += parseFloat(entry[7]);
        if (roundStart < timeStamp) {
            roundShares += parseFloat(entry[7]);
        }
        accounts[entry[3]] = 1;
    }

    var pool = {};
    pool.current_hashrate = Math.round(sumShares / (config.pool.stats.frame / 1000));
    pool.last_block_found = Math.round((now - roundStart) / 1000);
    pool.fee = config.pool.fee;
    pool.round_shares = roundShares;
    pool.miner_count = Object.keys(accounts).length;

    return pool;
}

module.exports = {
    getLastBlocks: getLastBlocks,
    getLastTransactions: getLastTransactions,
    getBalance: getBalance,
    getDashboard: getDashboard
};
