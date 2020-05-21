const MyEvent = require('../event');

class Util extends MyEvent {
    constructor() {
        super();
        this.characters = {
            number: '0123456789',
            latter: 'abcdefghijklmnopqrstuvxywz',
            supper: '!@#$%¨&*:;|^~º+-_§¢¬'
        };
    }

    stringReplace(option = this.Option.StringReplaceOption) {
        option.regExp = (option.global) ? new RegExp(option.toRegExp, 'g') : new RegExp(option.toRegExp);
        return option.string.replace(option.regExp, option.valueReplace);
    }

    getCryptoFileName(option = this.Option.CryptoPassSaveOption) {
        let file = '@date@crypto.json';
        return this.stringReplace({ toRegExp: '@date@', global: true, string: file, valueReplace: `${option.date.toLocaleDateString()}-` });
    }

    sleep(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, (parseFloat(time) || 1) * 1000);
        });
    }

    getDate() {
        return new Date();
    }

    getCharactersObject() {
        return this.characters;
    }

    arrayLen(array = []) {
        return {
            initial: 0,
            final: (array.length - 1) || 0
        };
    }

    valueArray(option = this.Option.ValueArrayOption) {
        let arrayLen = this.arrayLen(option.array);
        const originalIndex = option.index;

        if (option.index < 0) option.index = 0;
        if (option.index > arrayLen.final) option.index = (arrayLen.final);

        return {
            index: originalIndex,
            initial: arrayLen.initial,
            final: arrayLen.final,
            value: option.array[option.index]
        };
    }

    inArray(option = this.Option.InArrayOption) {
        let index = option.array.indexOf(option.value);
        return (index < 0) ? false : true;
    }

    getType(option) {
        return typeof option;
    }

    getObjectKeys(object) {
        try {
            return Object.keys(object);
        } catch (error) { return []; }
    }

    getObjectValue(object) {
        try {
            return Object.values(object);
        } catch (error) { return []; }
    }

    random(option = this.Option.RandomOption) {
        if (!option.decimalHouse) option.decimalHouse = 10;

        while (option.max > option.decimalHouse) {
            option.decimalHouse *= 10;
        }

        let randomValue = null;
        do {
            randomValue = Math.floor(Math.random() * option.decimalHouse);
        } while (option.min > randomValue || option.max < randomValue);
        return randomValue;
    }

    getPassword(option = this.Option.PasswordOption) {
        if (!option.len) option.len = 0;

        var object = this.getCharactersObject();
        var keys = this.getObjectKeys(object);
        var keyInfo = this.arrayLen(keys);
        var count = 0;
        var password = '';

        while (count != option.len) {
            let randIndexKey = this.random({ min: keyInfo.initial, max: keyInfo.final });
            let arrayKeyInfo = this.valueArray({ index: randIndexKey, array: keys });
            let value = object[arrayKeyInfo.value];
            let valueInfo = this.arrayLen(value);
            let randIndexValue = this.random({ min: valueInfo.initial, max: valueInfo.final });
            let valueRandInfo = this.valueArray({ index: randIndexValue, array: value });
            password += valueRandInfo.value;

            count += 1;
        }

        return password;
    }
}

module.exports = Util;