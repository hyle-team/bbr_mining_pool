const logger = require('../log');
const config = require('../config');
const rpc = require('../rpc');
const Redis = require('ioredis');
const redis = new Redis();

const units = config.pool.payment.units;
const threshold = config.pool.payment.threshold;
const denomination = config.pool.payment.denomination;

async function routine () {
    let response = await rpc.getBalance();
    if (response.error) {
        logger.log('Could not retrieve wallet balance');
    }
    logger.log('Wallet balance:', response.result.balance / units, 'unlocked:', response.result.unlocked_balance / units)

    let commands = [];
    let balances = await redis.zrange('balances', 0, -1, 'WITHSCORES');
    
    for (let i = 0, bLen = balances.length; i < bLen; i += 2) {
        let account = balances[i];
        let balance = balances[i + 1];

        if (balance >= threshold) {
            let remainder = balance % denomination;
            let payout = balance - remainder;
            if (payout > 0) {
                let destination = [{ address: account, 
                    amount: payout
                }];
                let logBalance = payout / units;
                let response = await rpc.transfer(destination);
                if (!response.error) {
                    let transaction = ['amount', payout, 'tx', response.result.tx_hash];
                    logger.log('Transfered', logBalance, 'BBR to', account);

                    commands.push(['xadd', 'transactions:' + account, '*', transaction]);
                    commands.push(['hincrby', 'miners:' + account, 'total-payments', payout]);
                    commands.push(['zincrby', 'balances', -payout, account]);
                    commands.push(['hmset', 'transactions:' + account, transaction])
                } else {
                    logger.error(response.error.message, 'for payment of', logBalance, 'BBR to', account);
                }
            }
        }
    }
    await redis.pipeline(commands).exec();
    setTimeout(routine, config.pool.payment.interval);
}

module.exports = routine;