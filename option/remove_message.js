const Message = require('./message');

class RemoveMessage {
    constructor() {
        this.time = 0;
        this.message = Message;
    }
}

module.exports = new RemoveMessage;