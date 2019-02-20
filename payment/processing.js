const rpc = require ('../rpc');
const config = require('../config');
const logger = require('../log');
const db = require('../db');

const units = config.pool.payment.units

async function routine () {
    let response = await rpc.getBalance();
    if (response.error) {
        logger.log('Could not retrieve wallet balance');
    }
    logger.log('Wallet balance:', response.result.balance / units, 'unlocked:', response.result.unlocked_balance / units)

    var workers = await db.getBalances();
    const threshold = config.pool.payment.threshold;
    const denomination = config.pool.payment.denomination;

    let i = 0;
    while (i < workers.length) {
        let balance = workers[i].balance;
        if (balance >= threshold) {
            let remainder = balance % denomination;
            let payout = balance - remainder;
            if (payout > 0) {
                workers[i].balance = payout;
                const destination = [{ address: workers[i].miner, 
                    amount: workers[i].balance}];
                let response = await rpc.transfer(destination);
                if (!response.error) {
                    let logBalance = workers[i].balance / units;
                    logger.log('Transfered', logBalance, 'BBR to', workers[i].miner);
                    workers[i].tx = response.result.tx_hash;
                    i++;
                } else {
                    logger.error(response.error.message);
                    workers.splice(i, 1);
                };
            } else {
                workers.splice(i, 1);
            };
        } else {
            workers.splice(i, 1);
        };
    };
    await db.proccessPayments(workers);
    setTimeout(routine, config.pool.payment.interval);

};


module.exports = routine;