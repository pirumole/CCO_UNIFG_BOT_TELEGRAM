const { EventEmitter } = require('events');

class MyEvent extends EventEmitter {
    constructor() {
        super();
        this.Option = require('../option');
        this.cryptoDirLog = 'cryptopass';
        this.CryptoLog = 'crypto-pass.json';
    }
}

module.exports = MyEvent;