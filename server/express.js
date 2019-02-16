const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../log');
const db = require('../db');
const config = require('../config');
const BlockTemplate = require('../pool/blocktemplate');
const Miner = require('../miner');

const app = express();

app.listen(config.pool.server.api, () => {
  logger.log('Express server started on port', config.pool.server.api);
})

app.use(bodyParser.json());

app.get('/log', async (req, res) => {
  res.end(logger.read());
});

app.get('/blocks', async (req, res) => {
  let height = BlockTemplate.current().height;
  let candidates = await db.getCandidates(height);
  let blocks = await db.getBlocks(height);
  res.end(`${JSON.stringify(candidates)}\n\n${JSON.stringify(blocks)}`);
});

app.get('/tx/:wallet/', async (req, res) => {
  let transactions = await db.getTransactions(req.params.wallet);
  res.send(transactions)
});

app.get('/balance/:wallet/', async (req, res) => {
  let balance = await db.getBalance(req.params.wallet);
  res.send(balance)
});

app.get('/dashboard', async (req, res) => {
  const dateNowSeconds = Date.now() / 1000 | 0;
  let blockHeader = await BlockTemplate.getBlockHeader();
  let network = {};
  let units = config.pool.payment.units;
  if (blockHeader) {
    network.hashRate = blockHeader.difficulty / 120 | 0;
    network.blockFound = dateNowSeconds - blockHeader.timestamp | 0;
    network.difficulty = blockHeader.difficulty;
    network.blockHeight = blockHeader.height;
    network.lastReward = blockHeader.reward / units;
    network.lastHash = blockHeader.hash;
  };

  let pool = {};
  let currentShares = await db.getTotalShares(BlockTemplate.current().height);
  let hashRate = await db.getCurrentHashrate();
  let blockFound = await db.getLastBlockTime();
  
  pool.hashRate = hashRate | 0;
  pool.blockFound = dateNowSeconds - blockFound;
  pool.miners = Miner.minersCount();
  pool.fee = 100 * config.pool.payment.fee / units;
  pool.effort = 100 * currentShares / BlockTemplate.current().difficulty | 0;

  netOutput = JSON.stringify(network).replace(/,/g, ',\n');
  poolOutput = JSON.stringify(pool).replace(/,/g, ',\n');
  res.end(`${netOutput}\n\n${poolOutput}`);
});
