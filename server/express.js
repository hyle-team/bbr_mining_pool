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
    if(config.pool.server.remote || req.ip == '127.0.0.1' || req.ip == '::ffff:127.0.0.1' || req.ip == '::1') {
      next();
    } else {
      res.end('Remote connection refused');
    }
  });

  app.get('/log', async (req, res) => {
    res.end(logger.read());
  });

  app.get('/scratchpad', function(req, res){
    var file = config.pool.scratchpad.path;
    res.download(file);
  });

  app.get('/blocks', async (req, res) => {
    let height = BlockTemplate.current().height;
    let promises = []
    promises.push(db.getCandidates(height));
    promises.push(db.getBlocks(height, 100));
    Promise.all(promises)
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => {
        res.end('Cannot query block data: ' + err);
      });
  });

  app.get('/tx/:wallet/', async (req, res) => {
    let transactions = await db.getTransactions(req.params.wallet);
    res.send(transactions)
  });

  app.get('/balance/:wallet/', async (req, res) => {
    let balance = await db.getBalance(req.params.wallet);
    res.send(balance)
  });

  app.get('/alias/:address/:alias/', async (req, res) => {
    let request = await alias.request(req.params.address, req.params.alias);
    if (request) {
      res.send("Alias registration request added: " + request);
    } else {
      res.send("Alias registration request failed");
    }
  });

  app.get('/check/:alias/', async (req, res) => {
    let availability = await alias.isAvailable(req.params.alias);
    if (availability) {
      res.send("Alias is available");
    } else {
      res.send("Alias is not available");
    }
  });

  app.get('/queue', async (req, res) => {
    let requests = await db.getAliasRequests(100);
    res.send(requests)
  });

  app.get('/dashboard', async (req, res) => {
    let promises = [];
    let current = BlockTemplate.current();
    promises.push(BlockTemplate.getBlockHeader());
    promises.push(db.getCurrentHashrate());
    promises.push(db.getBlocks(current.height, 100));
    Promise.all(promises)
      .then(data => {
        const units = config.pool.payment.units;
        const dateNowSeconds = Date.now() / 1000 | 0;
        let header = data[0];
        let hashRate = data[1];
        let blocks = data[2];

        if (!hashRate) {
          hashRate = BlockTemplate.currentHashRate();
        }

        let network = {};
        if (header) {
          network.hashRate = Math.round(header.difficulty / 120);
          network.blockFound = Math.round(dateNowSeconds - header.timestamp);
          network.difficulty = header.difficulty;
          network.blockHeight = header.height;
          network.lastReward = header.reward / units;
          network.lastHash = header.hash;
        };

        let pool = {};
        let currentShares = BlockTemplate.getTotalShares();
        pool.hashRate = hashRate;
        pool.blockFound = dateNowSeconds - BlockTemplate.lastBlockTime() / 1000 | 0;
        pool.miners = Miner.minersCount();
        pool.fee = config.pool.fee;
        pool.effort = Math.round(100 * currentShares / current.difficulty);

        let chartsData = [];
        for (let block of blocks) {
          let timeSpan = (block.endTime - block.startTime) / 1000;
          chartsData.push({
            difficulty: block.difficulty,
            hashRate: Math.round(block.shares / timeSpan),
            effort: 100 * block.shares / block.difficulty,
            time: block.endTime
          });
        };

        let output = {};
        output.network = network;
        output.pool = pool;
        output.charts = chartsData;
        res.end(JSON.stringify(output));
      });
  });

  app.get('/miner/:wallet', async (req, res) => {
    let promises = [];
    let height = BlockTemplate.current().height;
    let unlockHeight = height - config.pool.block.unlockDepth;
    let miner = req.params.wallet;
    promises.push(db.getCandidates(height));
    promises.push(db.getBalance(miner));
    promises.push(db.getPaymentsStats(miner));
    promises.push(db.getTotalShares(miner));
    promises.push(db.getShareDetails(miner, unlockHeight));
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
        
        let output = {};
        output.overview = overview;
        output.payments = payments;
        res.end(JSON.stringify(output));
      });
  });
}

module.exports = startServer;