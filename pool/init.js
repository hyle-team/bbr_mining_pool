const cluster = require('cluster');
const logger = require('../log');
const config = require('../config');
const BlockTemplate = require('./blocktemplate');
const scratchpad = require('./scratchpad');
const server = require('../server');
const db = require('../db');
const payment = require('../payment');

(async function init() {
    if (cluster.isMaster) {
        scratchpad.storeScratchpadRoutine();
        if (await db.mongo.connect()) {
            //payment.routine();
            db.payment();
        }
        cluster.fork();
        cluster.on('exit', (worker, code, signal) => {
            logger.error('Cluster worker', worker.process.pid, 'has died');
            logger.error('Code:', code, 'Signal:', signal);
            cluster.fork();
        });
    } else {
        if (await db.mongo.connect()) {
            await refreshBlockRoutine();
            server.start();
            server.router();
        }
    }
})();

async function refreshBlockRoutine() {
    await BlockTemplate.refresh();
    setTimeout(refreshBlockRoutine, config.pool.refreshBlockInterval);
}

