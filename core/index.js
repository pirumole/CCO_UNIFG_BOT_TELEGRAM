const Cache = require('../cache');

class Core extends Cache {
    constructor() {
        require('dotenv').config();
        super();
        this.Bot = new this.BotModule(this.process.env.TELEGRAM_TOKEN, { polling: true });
    }

    async listen() {
        this.Bot.on('message', () => {});
    }
}

module.exports = Core;