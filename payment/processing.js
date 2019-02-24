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

    var balances = await db.getBalance();
    const threshold = config.pool.payment.threshold;
    const denomination = config.pool.payment.denomination;

    let i = 0;
    while (i < balances.length) {
        let balance = balances[i].balance;
        if (balance >= threshold) {
            let remainder = balance % denomination;
            let payout = balance - remainder;
            if (payout > 0) {
                balances[i].balance = payout;
                const destination = [{ address: balances[i].miner, 
                    amount: balances[i].balance
                }];
                let response = await rpc.transfer(destination);
                if (!response.error) {
                    let logBalance = balances[i].balance / units;
                    logger.log('Transfered', logBalance, 'BBR to', balances[i].miner);
                    balances[i].tx = response.result.tx_hash;
                    i++;
                } else {
                    logger.error(response.error.message);
                    balances.splice(i, 1);
                };
            } else {
                balances.splice(i, 1);
            };
        } else {
            balances.splice(i, 1);
        };
    };
    await db.proccessPayments(balances);
    setTimeout(routine, config.pool.payment.interval);

};


module.exports = routine;