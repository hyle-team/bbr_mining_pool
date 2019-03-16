const cluster = require('cluster');
const logger = require('../log');
const config = require('../config');
const BlockTemplate = require('./blocktemplate');
const scratchpad = require('./scratchpad');
const server = require('../server');
const db = require('../db');

(async function init() {
    if (cluster.isMaster) {
        await db.block.init();
        db.paymentRoutine();
        scratchpad.storeScratchpadRoutine();
        unlockBlockRoutine();
        cluster.fork();
        cluster.on('exit', (worker, code, signal) => {
            logger.error('Cluster worker', worker.process.pid, 'has died');
            logger.error('Code:', code, 'Signal:', signal);
            cluster.fork();
        });

        await refreshBlockRoutine();
        server.start();
        server.router();

    } else {

    }
})();

async function refreshBlockRoutine() {
    await BlockTemplate.refresh();
    setTimeout(refreshBlockRoutine, config.pool.refreshBlockInterval);
}

async function unlockBlockRoutine() {
    await db.block.unlock();
    setTimeout(unlockBlockRoutine, config.pool.block.unlockInterval);
}

