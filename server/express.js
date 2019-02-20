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
    network.hashRate = Math.round(1793706080215 / 120);
    network.blockFound = Math.round(dateNowSeconds - blockHeader.timestamp);
    network.difficulty = blockHeader.difficulty;
    network.blockHeight = blockHeader.height;
    network.lastReward = blockHeader.reward / units;
    network.lastHash = blockHeader.hash;
  };

  let pool = {};
  let currentShares = BlockTemplate.getTotalShares();
  let hashRate = await db.getCurrentHashrate();
  let blockFound = await db.getLastBlockTime();
  
  pool.hashRate = Math.round(hashRate);
  pool.blockFound = dateNowSeconds - blockFound / 1000 | 0;
  pool.miners = Miner.minersCount();
  pool.fee = config.pool.fee;
  pool.effort = Math.round(100 * currentShares / BlockTemplate.current().difficulty);

  netOutput = JSON.stringify(network).replace(/,/g, ',\n');
  poolOutput = JSON.stringify(pool).replace(/,/g, ',\n');
  res.end(`${netOutput}\n\n${poolOutput}`);
});
