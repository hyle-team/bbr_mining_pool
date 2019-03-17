const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../log');
const db = require('../db');
const config = require('../config');
const BlockTemplate = require('../pool/blocktemplate');
const alias = require('../pool/alias');
const Miner = require('../miner');

function startServer() {
  const app = express();
  app.listen(config.pool.server.api, () => {
    logger.log('Express server started on port', config.pool.server.api);
  });

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use((req, res, next) => {
    if (config.pool.server.remote || req.ip == '127.0.0.1' || req.ip == '::ffff:127.0.0.1' || req.ip == '::1') {
      next();
    } else {
      res.end('Remote connection refused');
    }
  });

  app.get('/log', async (req, res) => {
    res.end(logger.read());
  });

  app.get('/scratchpad', function (req, res) {
    var file = config.pool.scratchpad.path;
    res.download(file);
  });

  app.get('/blocks', async (req, res) => {
    let blocks = await db.stats.getLastBlocks();
    res.send(blocks);
  });

  app.get('/blocks/:count', async (req, res) => {
    let blocks = await db.stats.getLastBlocks(req.params.count);
    res.send(blocks);
  });

  app.get('/blocks/:count/:offeset', async (req, res) => {
    let blocks = await db.stats.getLastBlocks(req.params.count, req.params.offset);
    res.send(blocks);
  });

  app.get('/tx/:account/', async (req, res) => {
    let transactions = await db.stats.getLastTransactions(req.params.account);
    res.send(transactions)
  });

  app.get('/tx/:account/:timeStamp', async (req, res) => {
    let transactions = await db.stats.getLastTransactions(req.params.account, req.params.timeStamp);
    res.send(transactions)
  });

  app.get('/balance/:account/', async (req, res) => {
    let balance = await db.stats.getBalance(req.params.account);
    res.send(balance.toString());
  });

  app.get('/alias/:address/:alias/', async (req, res) => {
    let request = await alias.request(req.params.address, req.params.alias);
    res.send((request) ? true : false);
  });

  app.get('/check/:alias/', async (req, res) => {
    let availability = await alias.isAvailable(req.params.alias);
    res.send(availability);
  });

  app.get('/queue', async (req, res) => {
    let requests = await alias.getQueue();
    res.send(requests)
  });

  app.get('/dashboard', async (req, res) => {
    let output = await db.stats.getDashboard()
    res.end(JSON.stringify(output));
  });

  app.get('/miner/:wallet', async (req, res) => {
    let promises = [];
    let height = BlockTemplate.current().height;
    let unlockHeight = height - config.pool.block.unlockDepth;
    let miner = req.params.wallet;
    promises.push(db.mongo.getCandidates(height));
    promises.push(db.mongo.getBalance(miner));
    promises.push(db.mongo.getPaymentsStats(miner));
    promises.push(db.mongo.getTotalShares(miner));
    promises.push(db.mongo.getShareDetails(miner, unlockHeight));
    Promise.all(promises)
      .then(data => {
        const units = config.pool.payment.units;
        let sumReward = 0;
        let sumShares = BlockTemplate.getTotalShares();
        let minerCurrentShares = BlockTemplate.getTotalShares(miner);
        let minerShares = data[4].total + minerCurrentShares;

        for (let i = 0; i < data[0].length; i++) {
          sumReward += data[0][i].reward;
          sumShares += data[0][i].shares;
        }

        let unconfirmed = sumReward * minerShares / sumShares / units;
        let confirmed = (data[1].length > 0) ? data[1][0].balance / units : 0;
        let total = 0;
        let h24 = 0;
        let shares = data[3].total + minerCurrentShares;
        let hashRate = data[4].average + BlockTemplate.currentHashRate(miner);

        let payments = {};
        if (data[2].length > 0) {
          total = data[2][0].total / units;
          h24 = data[2][0].h24 / units;
          payments.transactions = data[2][0].transactions;
        }

        let overview = {};
        overview.unconfirmed = unconfirmed;
        overview.confirmed = confirmed;
        overview.total = total;
        overview.h24 = h24;
        overview.shares = shares;
        overview.threshold = config.pool.payment.threshold / units;
        overview.hashRate = hashRate;

        let workers = {};
        workers.hasrate = BlockTemplate.currentHashRate(miner, true);

        let output = {};
        output.overview = overview;
        output.payments = payments;
        output.workers = workers;
        res.end(JSON.stringify(output));
      });
  });
}

module.exports = startServer;