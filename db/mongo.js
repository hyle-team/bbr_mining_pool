const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const logger = require('../log');

const url = `mongodb://${config.pool.mongodb.host}:${config.pool.mongodb.port}`;
const dbName = config.pool.mongodb.dbName;

const client = new MongoClient(url, { useNewUrlParser: true });
var db = {};

async function connect() {
    let res = await client.connect()
        .then(async () => {
            db = client.db(dbName);
            logger.log('Connected to MongoDB');
            return true;
        })
        .catch((err) => {
            logger.error('Couldn\'t connect to MongoDB');
            client.close();
            return false;
        });
    return res;
};

async function storeCandidate(block, totalShares, hash, startTime, endTime) {

    db.collection('candidates').insertOne({
        'height': block.height,
        'difficulty': block.difficulty,
        'hash': hash,
        'reward': block.reward,
        'shares': totalShares,
        'startTime': startTime,
        'endTime': endTime
    });

    db.collection('stats').updateOne({},
        { $set: { 'lastBlockFound': endTime } },
        { upsert: true });
};

async function storeRoundShares(height, currentShares, startTime, endTime) {
    let bulkRoundStats = [];
    Object.keys(currentShares).forEach(miner => {
        let entry = miner.split(':');
        bulkRoundStats.push({
            'height': height,
            'miner': entry[0],
            'worker': entry[1],
            'score': currentShares[miner].score,
            'shares': currentShares[miner].shares,
            'startTime': startTime,
            'endTime': endTime,
        });
    });

    if (bulkRoundStats.length > 0) {
        db.collection('shares').insertMany(bulkRoundStats);
    }
};

async function storeBlockRewards(rewards) {
    db.collection('balances').bulkWrite(rewards);
};

async function unlockBlock(height, orphan) {
    let block = await db.collection('candidates').findOneAndDelete({ 'height': height });
    if (block.value) {
        block.value.status = (orphan) ? 'orphan' : 'confirmed';
        db.collection('blocks').insertOne(block.value);
    }
}

async function getBlocks(height, limit = 0) {
    let col = db.collection('blocks');
    return await col.find({ 'height': { $lte: height } },
        { projection: { _id: 0 } })
        .sort([['height', -1]])
        .limit(limit)
        .toArray();
}

async function getCandidates(height) {
    let col = db.collection('candidates');
    return await col.find({ 'height': { $lte: height } },
        { projection: { _id: 0 } })
        .sort([['height', -1]])
        .toArray();
}

async function getShares(height) {
    let col = db.collection('shares');
    return await col.find({ 'height': height }, { projection: { _id: 0 } })
        .toArray();
}

async function proccessPayments(balances) {
    if (balances.length > 0) {
        let balanceCol = db.collection('balances');
        let transCol = db.collection('transactions');
        let bulkBalances = balanceCol.initializeOrderedBulkOp();
        let bulkTrans = transCol.initializeOrderedBulkOp();

        balances.forEach(balance => {
            bulkBalances.find({
                'miner': balance.miner
            }).updateOne({
                $inc: { 'balance': -parseInt(balance.balance) }
            });

            delete balance._id;
            balance.time = new Date();
            bulkTrans.insert(balance);
        });

        bulkBalances.execute();
        bulkTrans.execute();
    }
}

async function getTransactions(wallet = null) {
    let col = db.collection('transactions');
    let filter = (wallet) ? { 'miner': wallet } : {};
    return await col.find(filter,
        { projection: { _id: 0 } }).toArray();
}

async function getPaymentsStats(wallet = null) {
    let filter = (wallet) ? { 'miner': wallet } : {};
    let yesterday = new Date(Date.now() - 86400 * 1000);
    return await db.collection('transactions').aggregate([
        { $match: filter }, {
            $group: {
                _id: null,
                total: { $sum: '$balance' },
                h24: { $sum: { $cond: [{ $gte: ['$time', yesterday] }, '$balance', 0] } },
                transactions: { $push: { balance: '$balance', tx: '$tx', time: '$time' } }
            }
        }]).toArray();
}

async function getBalance(wallet = null) {
    let col = db.collection('balances');
    let filter = (wallet) ? { 'miner': wallet } : {};
    return await col.find(filter,
        { projection: { _id: 0 } }).toArray();
}

async function getCurrentHashrate() {
    let shares = await db.collection('candidates').aggregate([{
        $group: {
            _id: null,
            startTime: { $min: '$startTime' },
            endTime: { $max: '$endTime' },
            sum: { $sum: '$shares' }
        }
    }]).toArray();
    if (shares.length > 0) {
        let time = (shares[0].endTime - shares[0].startTime) / 1000;
        return Math.round(shares[0].sum / time);
    }
}

async function getTotalShares(wallet = null) {
    let filter = (wallet) ? { miner: wallet } : {};
    let shares = await db.collection('shares').aggregate([
        { $match: filter }, {
            $group: {
                _id: null,
                startTime: { $min: '$startTime' },
                endTime: { $max: '$endTime' },
                sum: { $sum: '$shares' }
            }
        }]).toArray();
    var output = {};
    if (shares.length > 0) {
        let time = (shares[0].endTime - shares[0].startTime) / 1000;
        output.total = shares[0].sum;
        output.average = Math.round(shares[0].sum / time);
    } else {
        output.total = output.average = 0;
    }
    return output;
}

async function getShareDetails(wallet = null, height = null, worker = null) {
    let filter = {};
    if (wallet) filter.miner = wallet;
    if (worker) filter.worker = worker;
    if (height) filter.height = { $gt: height };
    let shares = await db.collection('shares').aggregate([
        { $match: filter }, {
            $group: {
                _id: null,
                startTime: { $min: '$startTime' },
                endTime: { $max: '$endTime' },
                shares: { $sum: '$shares' },
                score: { $sum: '$score' }
            }
        }]).toArray();
    var output = {};
    if (shares.length > 0) {
        let time = (shares[0].endTime - shares[0].startTime) / 1000;
        output.total = shares[0].shares;
        output.average = Math.round(shares[0].shares / time);
    } else {
        output.total = output.average = 0;
    }
    return output;  
}

async function getLastBlockTime() {
    let col = db.collection('stats');
    let stat = await col.findOne({});
    if (stat)
        return stat.lastBlockFound;
}

module.exports = {
    connect: connect,
    storeCandidate: storeCandidate,
    storeRoundShares: storeRoundShares,
    storeBlockRewards: storeBlockRewards,
    unlockBlock: unlockBlock,
    getBlocks: getBlocks,
    getCandidates: getCandidates,
    getShares: getShares,
    proccessPayments: proccessPayments,
    getTransactions: getTransactions,
    getPaymentsStats: getPaymentsStats,
    getBalance: getBalance,
    getCurrentHashrate: getCurrentHashrate,
    getTotalShares: getTotalShares,
    getShareDetails: getShareDetails,
    getLastBlockTime: getLastBlockTime,
};
