const config = require('../config');
const BlockTemplate = require('./blocktemplate');
const scratchpad = require('./scratchpad');
const server = require('../server');
const db = require('../db');
const payment = require('../payment');

(async function init() {
    scratchpad.storeScratchpadRoutine();
    let connected = await db.connect();
    if (connected) {
        await refreshBlockRoutine();
        server.start();
        payment.routine();
    }
})();

async function refreshBlockRoutine() {
    await BlockTemplate.refresh();
    setTimeout(refreshBlockRoutine, config.pool.refreshBlockInterval);
}

