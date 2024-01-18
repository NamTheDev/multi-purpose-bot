const EmojiStructure = require("../structures/EmojiStructure");

class Emoji {
    /**
     * @param {string | EmojiStructure} emoji 
     * @returns {object} 
     */
    constructor(emoji) {
        if (typeof emoji === 'object') {
            if (!emoji.id) emoji.id = null;
            return emoji;
        } else return { id: null, name: emoji };
    }
}
module.exports = Emoji