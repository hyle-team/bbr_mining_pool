const mongo = require('./mongo');
const block = require('./block');
const payment = require('./payment');

module.exports = { 
    mongo: mongo,
    block: block,
    paymentRoutine: payment
};
