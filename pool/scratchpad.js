const rpc = require('../rpc');
const config = require('../config');
const logger = require('../log');

var scratchpad = { buffer: Buffer.alloc(0), block_id: '', height: 0 };

async function storeScratchpadRoutine() {
    let response = await rpc.sweepBelow(config.pool.address, config.pool.payment.sweep);
    if (response.error) {
        logger.error('Could not sweep wallet outputs:', response.error);
    }

    rpc.storeScratchpad(config.pool.scratchpad.path)
        .then((response) => {
            if (response.error) {
                logger.error('Unable to store scratchpad');
            }
            setTimeout(storeScratchpadRoutine, config.pool.scratchpad.storeInterval);
        });
}

async function getFullScratchpad() {
    let response = await rpc.getFullScratchpad();

    if (response.error) {
        logger.error('Empty scratchpad');
    } else {
        let buff = response;
        let bin_buffer = Buffer.from(buff.slice(0, 4));
        let json_len = bin_buffer.readUInt32LE(0);
        let json_str_buff = buff.slice(4, 4 + json_len).toString();
        var res = JSON.parse(json_str_buff);
        scratchpad.buffer = Buffer.from(buff.slice(4 + json_len));
        scratchpad.height = res.height;
        scratchpad.block_id = res.block_id;
    }
}

async function getAddendum(miner, currentTemplate) {
    if (miner.hi.height === 0
        || (miner.hi.height + 1) === currentTemplate.height
        || (miner.addendum.length && (miner.addendum[miner.addendum.length - 1].hi.height + 1) === currentTemplate.height)) {
        return;
    }
    let response = await rpc.getAddendum(miner.hi);
    if (response.error) {
        logger.error('Error fetching addendum');
        return;
    }

    let addms = response.result.addms;
    miner.addendum = [];
    for (var i = 0; i < addms.length; ++i) {
        let addm = addms[i];
        if (addm.hi.height > miner.hi.height) {
            miner.addendum.push(addm);
        }
    }
}

exports.storeScratchpadRoutine = storeScratchpadRoutine;
exports.getFullScratchpad = getFullScratchpad;
exports.getAddendum = getAddendum;
exports.current = scratchpad;