const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

const url = `mongodb://${config.pool.mongodb.host}:${config.pool.mongodb.port}`;
const dbName = config.pool.mongodb.dbName;

const client = new MongoClient(url, { useNewUrlParser: true });
var db = {};

async function connect() {
    let res = await client.connect()
        .then(async () => {
            db = client.db(dbName);
            return true;
        })
        .catch((err) => {
            console.error('Couldn\'t connect to MongoDB');
            client.close();
            return false;
        });
    return res;
};

async function storeMinerShare(height, account, score, jobDiff, dateNow) {
    const dateNowSeconds = dateNow / 1000 | 0;

    await db.collection('shares').updateOne({
        'height': height,
        'account': account
    }, {
            $inc: { 'score': parseInt(score) }
        },
        { upsert: true });

    await db.collection('workers').updateOne({ 'account': account },
        {
            $inc: { 'hashes': parseInt(jobDiff) },
            $set: { 'lastShare': dateNowSeconds }
        },
        { upsert: true });
};

async function storeBlockCandidate(height, templateDiff, hash, dateNow) {
    const dateNowSeconds = dateNow / 1000 | 0;

    db.collection('shares').aggregate([{
        $match: { 'height': height }
    }, {
        $group: { _id: null, total: { $sum: "$score" } }
    }]).toArray((err, result) => {
        if (!err) {
            db.collection('blocks').insertOne({
                'status': 'candidate',
                'height': height,
                'difficulty': templateDiff,
                'hash': hash,
                'date': dateNowSeconds,
                'shares': result[0].total
            });
        }
    });

    db.collection('stats').updateOne({},
        { $set: { 'lastBlockFound': dateNow } },
        { upsert: true });
};

async function unlockBlock(orphan, height, reward, totalShares) {
    let col = db.collection('shares');
    let shares = await col.find({ 'height': height }).toArray();
    if (shares.length > 0) {
        let bulkShares = col.initializeOrderedBulkOp();
        if (orphan) {
            shares.forEach(share => {
                bulkShares.find({
                    'height': share.height + config.pool.block.unlockDepth,
                    'account': share.account
                })
                    .upsert().updateOne({ $inc: { 'score': parseInt(share.score) } });
            });
        } else {
            let bulkRewards = db.collection('balances').initializeOrderedBulkOp();
            let feePercent = config.pool.fee / 100;
            reward = Math.round(reward - (reward * feePercent));
            shares.forEach(share => {
                let percent = share.score / totalShares;
                let workerReward = Math.round(reward * percent);
                bulkRewards.find({'account': share.account})
                .upsert().updateOne({ $inc: { 'balance': workerReward } });
            });
            await bulkRewards.execute();
        }
        bulkShares.find({ 'height': height }).remove();
        await bulkShares.execute();
    }

    let status = (orphan) ? 'orphan' : 'matured';
    await db.collection('blocks').updateOne({ 'height': height },
        { $set: { 'status': status } });
}

async function getBlock(height) {
    let col = db.collection('blocks');
    return await col.findOne({ 'height': height });
}

async function getBalances() {
    const col = db.collection('balances');
    const balances = await col.find({}).toArray();
    return balances;
}

async function proccessPayments(balances) {
    if(balances.length === 0) {
        return;
    }

    let col = db.collection('balances');
    let bulkBalances = col.initializeOrderedBulkOp();

    balances.forEach(balance => {
        bulkBalances.find({
            'account': balance.account
        })
            .updateOne({ $inc: { 'balance': -parseInt(balance.balance) }});
    });

    await bulkBalances.execute();
}

module.exports = {
    db: db,
    connect: connect,
    storeMinerShare: storeMinerShare,
    storeBlockCandidate: storeBlockCandidate,
    unlockBlock: unlockBlock,
    getBlock: getBlock,
    getBalances: getBalances,
    proccessPayments: proccessPayments
};
