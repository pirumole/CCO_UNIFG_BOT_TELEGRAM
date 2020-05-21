class StringReplaceOption {
    constructor() {
        this.toRegExp     = '';
        this.regExp       = new RegExp('');
        this.valueReplace = '';
        this.global       = false;
        this.string       = '';
    }
}

module.exports = new StringReplaceOption;