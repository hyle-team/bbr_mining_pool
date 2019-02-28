const cnUtil = require('cryptonote-util');
const config = require('../config');
const logger = require('../log');
const alias = require('../pool/alias');
const BlockTemplate = require('../pool/blocktemplate');

const donateSeparator = '#';
const fixedDiffSeparator = '_';
const addressBase58Prefix = cnUtil.address_decode(Buffer.from(config.pool.address));

async function login(params, reply) {
    if (!BlockTemplate.current()) {
        reply('no blocktemplate');
        reply('no blocktemplate');
        return false;
    }

    if (params.hi && (BlockTemplate.current().height - params.hi.height) > 9360) {
        logger.debug('invalid miner height, redownload scratchpad');
        reply('invalid miner height, redownload scratchpad');
        return false;
    }

    let login = params.login;
    if (!login) {
        logger.debug('missing login');
        reply('missing login');
        return false;
    }
    login = login.split(donateSeparator)[0]; //remove donation address
    login = login.split(fixedDiffSeparator)[0]; //remove fixed difficulty

    if (login.indexOf('@') === 0) {
        login = login.substr(1);
        let result = await alias.getDetails(login);
        if (result) {
            login = result.alias_details.address;
        } else {
            logger.debug('Invalid alias');
            reply('Invalid alias');
            return false;
        }
    }
    if (addressBase58Prefix !== cnUtil.address_decode(Buffer.from(login))) {
        logger.error('Invalid address');
        reply('Invalid address');
        return false;
    }

    return true;
}

module.exports = login;