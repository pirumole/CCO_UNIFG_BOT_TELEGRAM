const Storage = require('../storage');

class Crypt extends Storage {
    constructor() { 
        super();
        this.ivLen     = 16;
        this.salt      = 24;
        this.passrange = 100;
        this.password  = '';
        this.date      = null;
        this.setCryptoPassWord();

        this.algorithm = 'aes-192-cbc';
        this.encoding  = 'sha256';

        this.iv        = Buffer.alloc(this.ivLen, 0);
        this.key       = this.getCryptoKey();
        this.cipher    = this.getCryptoCipher();
        this.decipher  = this.getCryptoDecipher();

        this.emit('save-password', { date: this.date, password: this.password, fileName: this.getCryptoFileName({ date: this.date }) });
    }

    setCryptoPassWord() {
        this.date     = this.getDate();
        this.password = this.getPassword({ len: this.passrange });
    }

    getCryptoKey() {
        return this.crypto.scryptSync(
            this.password,
            "salt",
            this.salt
        );
    }

    getCryptoCipher() {
        return this.crypto.createCipheriv(
            this.algorithm,
            this.key,
            this.iv
        );
    }

    getCryptoDecipher() {
        return this.crypto.createDecipheriv(
            this.algorithm,
            this.key,
            this.iv
        );
    }

    encryptSync(value) {
        return new Promise((resolve) => {
            this.cipher.on('readable', () => {
                let chunk;
                let encrypt = '';
                while(null !== (chunk = this.cipher.read())) {
                    encrypt += chunk.toString('hex');
                }

                resolve(encrypt);
            });

            this.cipher.write(value);
            this.cipher.end();
        });
    }

    decryptSync(value) {
        return new Promise((resolve) => {
            this.decipher.on('readable', () => {
                let chunk;
                let decrypt = '';
                while(null !== (chunk = this.decipher.read())) {
                    decrypt += chunk.toString('utf8');
                }
                resolve(decrypt);
            });

            this.decipher.write(value, 'hex');
            this.decipher.end();
        });
    }
}

module.exports = Crypt;