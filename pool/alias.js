const logger = require('../log');
const db = require('../db');
const rpc = require('../rpc');
const config = require('../config');

var getNext = true;
var current = {
    alias: '',
    address: '',
    tracking_key: '',
    comment: 'alias created by hyle team'
};

debug();
async function debug() {
    let res = await isAvailable('sowle');
    logger.debug('CHECK ALIAS', res);
}

async function getDetails(alias) {
    let response = await rpc.getAliasDetails(alias);
    if (!response.result || response.result.status !== "OK") {
        logger.error('Invalid alias', alias, response.result.status);
        return null;
    }
    return response.result;
}

async function isAvailable(alias) {
    let response = await rpc.getAliasDetails(alias);
    if (response.result && response.result.status.includes('Alias not found')) {
        return true;
    } else {
        return false;
    }
}

async function request(address, alias) {
    if (await isAvailable(alias)) {
        let shares = await db.getTotalShares(address);
        db.addAliasRequest(address, alias, shares.total);
        return true;
    }
}

async function updateQueue() {
    await db.updateAliasQueue(current.alias);
    getNext = true;
}

async function getCurrent() {
    if (getNext) {
        let nextAlias = await db.getAliasRequests();
        if (nextAlias.length > 0) {
            current.alias = nextAlias[0].alias;
            current.address = nextAlias[0].address;
        } else {
            current.alias = '';
            current.address = '';
        }
        getNext = false;
    }
    return current;
}

module.exports = {
    getDetails: getDetails,
    isAvailable: isAvailable,
    request: request,
    getCurrent: getCurrent,
    updateQueue: updateQueue
}