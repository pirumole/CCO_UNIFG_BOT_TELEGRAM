const Config = require('../config');

class Cache extends Config {
    constructor() { 
        super();
        this.commandText = `/notification\n` +
        `/grid\n` +
        `/message_to_me`
    }
}

module.exports = Cache;