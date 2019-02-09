const login = require('./login');
const config = require('../config');
const scratchpad = require('../pool/scratchpad');
const share = require('../pool/share');
const BlockTemplate = require('../pool/blocktemplate');


const bignum = require('bignum');
const diffOne = bignum('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);
const validJobsCount = 5;

var connectedMiners = {};
var doRetarget = true;

Buffer.prototype.toByteArray = function () {
    return Array.prototype.slice.call(this, 0)
}

class Miner {
    constructor(id, login, password, address, difficulty, pushMessage) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.address = address;
        this.pushMessage = pushMessage;
        this.difficulty = difficulty;
        this.timeStamp = Date.now();
        this.validJobs = [];
        this.account = (this.password.match(/^[a-f0-9]{64}$/i) != null) ?
            [this.login, this.password].join(':') : this.login;
        this.hi = { block_id: '', height: 0 };
        this.addendum = [];

        this.listener = this.newTemplate.bind(this);
        BlockTemplate.notifier().on('NewTemplate', this.listener);
    }

    static async executeMethod(method, params, address, reply, message) {
        switch (method) {
            case 'login':
                let loggedIn = await login(params, reply);
                if (loggedIn) {
                    let difficulty = config.pool.server.difficulty;
                    let id = uid();

                    var miner = new Miner(id, params.login, params.pass, address, difficulty, message);
                    connectedMiners[id] = miner;
                    console.log('Miner logged in:', miner.account);
                    if (params.hi
                        && params.hi.height
                        && params.hi.block_id
                        && /^[a-f0-9]{64}$/.test(params.hi.block_id)) {
                        miner.hi.height = params.hi.height;
                        miner.hi.block_id = params.hi.block_id;
                    }
                    await scratchpad.getAddendum(miner, BlockTemplate.current());
                    reply(null, miner.getJob());
                }
                break;
            case 'getjob':
                var miner = connectedMiners[params.id];
                if (miner) {
                    if (params.hi && params.hi.height >= miner.hi.height
                        && params.hi.block_id
                        && /^[a-f0-9]{64}$/.test(params.hi.block_id)) {
                        miner.hi.height = params.hi.height;
                        miner.hi.block_id = params.hi.block_id;
                    }
                    await scratchpad.getAddendum(miner, BlockTemplate.current());
                    reply(null, miner.getJob());
                } else {
                    reply('Unauthenticated');
                }
                break;
            case 'submit':
                var miner = connectedMiners[params.id];
                if (miner) {
                    if (params.hi && params.hi.height >= miner.hi.height
                        && params.hi.block_id
                        && /^[a-f0-9]{64}$/.test(params.hi.block_id)) {
                        miner.hi.height = params.hi.height;
                        miner.hi.block_id = params.hi.block_id;
                    }
                    if (share.validate(miner, params, reply)) {
                        reply(null, { status: 'OK' });
                        if (doRetarget) {
                            share.retarget(miner, params.job_id);
                        }
                    }
                } else {
                    reply('Unauthenticated');
                }
                break;
            case 'keepalived':
                reply(null, { status: 'KEEPALIVED' });
                break;
        }
    }

    getJob() {
        const currentTemplate = BlockTemplate.current()
        let blob = currentTemplate.nextBlob();
        let target = share.getTargetHex(this);

        var newJob = {
            id: uid(),
            extraNonce: currentTemplate.extraNonce,
            height: currentTemplate.height,
            difficulty: this.difficulty,
            submissions: [],
            timeStamp: Date.now()
        };

        if (this.validJobs.push(newJob) > validJobsCount)
            this.validJobs.shift();

        let addms = this.addendum;
        let reply = {
            id: this.id,
            job: {
                blob: blob,
                job_id: newJob.id,
                target: target,
                difficulty: this.difficulty.toString(),
                prev_hi: this.hi,
                status: 'OK',
                addms: addms
            },
            status: 'OK'
        }

        if (addms.length !== 0) {
            this.hi = addms[addms.length - 1].hi;
        }
        this.addendum = []
        return reply;
    }

    async newTemplate () {
        await scratchpad.getAddendum(this, BlockTemplate.current());
        var job = this.getJob().job;
        this.pushMessage('job', job);

        if (doRetarget) {
            setTimeout(() => {
                share.retarget(this, job.job_id);
            }, config.pool.share.targetTime + config.pool.share.targetTimeSpan + 1000);
        }
    };
}

function uid() {
    var min = 100000000000000;
    var max = 999999999999999;
    var id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
}

setInterval(() => {
    var now = Date.now();
    let timeout = config.pool.share.timeout;

    for (let id in connectedMiners) {
        let miner = connectedMiners[id];
        let timeGap = now - miner.timeStamp;
        if (timeGap > timeout) {
            console.log(`Miner was idle for ${miner.account / 1000} and now removed ${miner.account}`);
            BlockTemplate.notifier().removeListener('NewTemplate', miner.listener);
            miner.validJobs = [];
            delete connectedMiners[id];
         }
    }
    console.log(`Pool has ${Object.keys(connectedMiners).length} active miners`);

}, config.pool.share.timeout);

module.exports = Miner;