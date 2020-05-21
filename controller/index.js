const Cache = require('../cache');

class Controller extends Cache {
    constructor() { super(); }

    isCommand(message = this.Option.TelegraMessageOption) {
        if (!message.entities || !message.entities.length) return false;
        let filter = message.entities.filter((entitie) => { if (entitie.type == 'bot_command') return entitie; });
        return !!filter.length;
    }

    async removeMessage(option = this.Option.RemoveMessageOption) {
        await this.sleep(option.time);
        this.Bot.deleteMessage(option.message.chat.id, option.message.message_id);
        return true;
    }

    async readBotCommandSync(message = this.Option.TelegraMessageOption) {
        this.removeMessage({ time: this.botMessageTimeClear, message: message });
        
        var intervalCaption = setInterval(async () => {
            this.Bot.sendChatAction(message.chat.id,'typing');
        }, 1000);

        let text;
        if (message.text == '/start') {
            text = this.commandText;
        } else if (message.text == '/notification') {
            text = 'don\'t have notifications.';
        } else if (message.text == '/grid') {
            text = 'don\'t have grid.';
        } else if (message.text == '/message_to_me') {
            text = 'don\'t have messages for you.';
        }

        await this.sleep(1);
        clearInterval(intervalCaption);

        const sendedMessage = await this.Bot.sendMessage(message.chat.id, text);
        this.removeMessage({ time: this.botMessageTimeClear, message: sendedMessage });
        return true;
    }

    // ReadStream(stream = new this.Stream) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             var chunkData = [];
    //             var buffer;
    //             stream.on('data', (chunk) => {
    //                 if (chunk) chunkData.push(chunk);
    //             });
    
    //             stream.on('end', () => {
    //                 buffer = Buffer.concat(chunkData);
    //                 resolve(buffer);
    //             })
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    // async readPhoto(message = this.Option.TelegraMessageOption) {
    //     try {
    //         let fileOption = {
    //             normalize: true,
    //             normalizeCount: 1,
    //             hightFile: null
    //         };

    //         var photoArray = message.photo.slice();
    //         while (fileOption.normalize) {
    //             fileOption.normalizeCount = 1;
    //             for(let x = 0; x < photoArray.length; x++) {
    //                 if (x == 0) continue;
    //                 let lastPhoto = photoArray[x - 1];
    //                 let newPhoto = photoArray[x];

    //                 if (lastPhoto.file_size < newPhoto.file_size) {
    //                     photoArray[x - 1] = newPhoto;
    //                     photoArray[x] = lastPhoto;
    //                 } else {
    //                     fileOption.normalizeCount += 1;
    //                 }
    //             }
    //             if (fileOption.normalizeCount == photoArray.length) fileOption.normalize = false;
    //         }

    //         fileOption.hightFile = photoArray[0];

    //         var photo = await this.Bot.getFile(fileOption.hightFile.file_id);
    //         var stream = this.Bot.getFileStream(photo.file_id);
    //         var buffer = await this.ReadStream(stream);
            
    //         const sendedMessage = await this.Bot.sendPhoto(message.chat.id, buffer);
    //         this.removeMessage({ time: this.botMessageTimeClear, message: sendedMessage });
    //         this.fs.writeFileSync(`./images/a.png`, buffer, {encoding: 'binary'});

    //         return true;
    //     } catch (error) {
    //         return true;
    //     }
    // }

    async onMessageSync(message = this.Option.TelegraMessageOption, metadata = this.Option.MetadataOption) {
        while(this.backupMode) {
            await this.sleep(5);
        }

        if (metadata.type == "text") {
            if (this.isCommand(message)) return await this.readBotCommandSync(message);
        } else if (metadata.type == "photo") {
            // this.readPhoto(message);
        }

        this.removeMessage({ time: this.botMessageTimeClear, message: message });
        return true;
    }
}

module.exports = Controller;