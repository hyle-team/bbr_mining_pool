const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('../db');
const config = require('../config');
const BlockTemplate = require('../pool/blocktemplate');

const app = express();

app.listen(config.pool.server.api, () => {
    console.log('Express server started on port', config.pool.server.api);
})

app.use(bodyParser.json()); 
//app.use(cookieParser);

app.get('/blocks', async (req, res) => {
    let height = BlockTemplate.current().height;
    let candidates = await db.getCandidates(height);
    let blocks = await db.getBlocks(height);
    res.end(JSON.stringify(candidates) + JSON.stringify(blocks));
});

app.get('/tx/:wallet/', async (req, res) => {
    let transactions = await db.getTransactions(req.params.wallet);
    res.send(transactions)
  });

  app.get('/balance/:wallet/', async (req, res) => {
    let balance = await db.getBalance(req.params.wallet);
    res.send(balance)
  });
