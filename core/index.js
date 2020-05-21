const Controller = require('../controller');

class Core extends Controller {
    constructor() {
        require('dotenv').config();
        super();
    }

    async listen() {
        try {
            this.Bot.on('message', (message, metadata) => this.onMessageSync(message, metadata));
            this.Bot.on('error', () => {});
            this.Bot.on('polling_error', () => {});
            this.Bot.on('webhook_error', () => {});

            setInterval(async () => {
                this.backupMode = true;
                await this.sleep(5);
                this.backupMode = false;
            }, (parseFloat(this.timeToClearCache) || 1) * 10000);
        } catch (error) {
        }
    }
}

module.exports = Core;