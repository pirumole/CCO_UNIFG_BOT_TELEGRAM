const Util = require('./util');

class Storage extends Util {
    constructor() {
        super();
        this.BotModule = require('node-telegram-bot-api');
        this.fs = require('fs');
        this.os = require('os');
        this.process = require('process');
        this.crypto = require('crypto');
        this.on('save-password', this.savePassSave);
    }

    async dirExists(dir) {
        try {
            await this.fs.readdirSync(dir);
            return true;
        } catch (error) {
            return false;
        }
    }

    async dirFileExists(pathAndDir, file) {
        try {
            let dir = await this.fs.readdirSync(pathAndDir);

            let index = dir.indexOf(file);
            if (index < 0) return false;
            return true;
        } catch (error) {
            return false;
        }
    }

    async createDir(pathAndDir) {
        try {
            await this.fs.mkdirSync(pathAndDir);
            return true;
        } catch (error) {
            return false;
        }
    }

    async savePassSave(option = this.Option.SavePassOption) {
        const fileName = option.fileName;
        delete option.fileName;

        let dirLog = __dirname + `\\${this.cryptoDirLog}`;
        if (!await this.dirExists(dirLog)) 
            if (!await this.createDir(dirLog)) return true;
        
        if (!await this.dirFileExists(dirLog, this.CryptoLog))
            await this.fileSaveSync({ path: dirLog, fileName: this.CryptoLog, value: JSON.stringify({ files: [] }) });

        let fileLog = await this.readFileSync({ path: dirLog, fileName: this.CryptoLog, convertType: 'json' });

        fileLog.files.push({
            date     : option.date,
            fileName : fileName
        });

        await this.fileSaveSync({ path: dirLog, fileName: this.CryptoLog, value: JSON.stringify(fileLog)});
        await this.fileSaveSync({ path: dirLog, fileName: fileName, value: JSON.stringify(option) });
    }

    convert(type, value) {
        switch (type) {
            case 'json':
                return JSON.parse(value);
            default:
                return value;
        }
    }

    async fileSaveSync(option = this.Option.SaveFileOption) {
        await this.fs.writeFileSync(`${option.path}\\${option.fileName}`, option.value, { encoding: 'utf8' });
        return true;
    }

    async readFileSync(option = this.Option.ReadFileOption) {
        let file = await this.fs.readFileSync(`${option.path}\\${option.fileName}`, { encoding: 'utf8' });
        return this.convert(option.convertType, file);
    }
}

module.exports = Storage;