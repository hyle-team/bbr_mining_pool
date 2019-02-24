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

  app.get('/log', async (req, res) => {
    res.end(logger.read());
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
}

module.exports = startServer;