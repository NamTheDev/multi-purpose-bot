/**
 * @enum {'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link'}
 */
const ButtonStyles = { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 }
class Button {
    /**
     * @param {{
     * style: ButtonStyles,
     * label: string,
     * emoji: string,
     * custom_id: string,
     * url: string,
     * disabled: boolean
     * }} json
     * @returns {object}
     */
    constructor(json) {
        function extend(destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        };
        extend(json, { type: 2 });
        console.log(json)
        return json
    }
}
Button.type = 2

class Emoji {
    /**
     * @param {string | {
     * id: string,
     * name: string
     * }} emoji 
     * @returns {object} 
     */
    constructor(emoji) {
        if (typeof emoji === 'object') {
            if (!emoji.id) emoji.id = null;
            return emoji;
        } else return { id: null, name: emoji };
    }
}

/**
 * @enum {{
* title: string, 
* url: string, 
* author: { name: string, icon_url: string, url: string }, 
* color: number, 
* description: string, 
* thumbnail: { url: string }, 
* fields: Array.<{name: string, value: string, inline: boolean}>, 
* image: { url: string }, 
* timestamp: Date, 
* footer: { text: string, icon_url: string }}}
*/
const EmbedStructure = {}

class Embed {
    /**
     * 
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setTitle(string) {
        this.title = string
        return this
    }
    /**
     * 
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setURL(string) {
        this.title = string
        return this
    }
    /**
     * 
     * @param {{name: string, icon_url: string, url: string}} object 
     * @returns {EmbedStructure}
     */
    setAuthor(object) {
        this.author = object
        return this
    }
    /**
     * 
     * @param {number} number 
     * @returns {EmbedStructure}
     */
    setColor(number) {
        this.color = number
        return this
    }
    /**
     * 
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setDescription(string) {
        this.description = string
        return this
    }
    /**
     * 
     * @param {{url: string}} object 
     * @returns {EmbedStructure}
     */
    setThumbnail(object) {
        this.thumbnail = object
        return this
    }
    /**
     * 
     * @param {Array.<{name: string, value: string}>} object 
     * @returns {EmbedStructure}
     */
    setFields(object) {
        this.fields = object
        return this
    }
    /**
     * 
     * @param {{name: string, value: string}} object 
     * @returns 
     */
    addField(object) {
        if (typeof this.fields === 'object' && !isNaN(this.fields.length)) this.fields.push(object)
        return this
    }
    /**
     * 
     * @param {{url: string}} object 
     * @returns {EmbedStructure}
     */
    setImage(object) {
        this.image = object
        return this
    }
    /**
     * 
     * @param {Date} date 
     * @returns {EmbedStructure}
     */
    setTimestamp(date) {
        this.timestamp = date
        return this
    }
    /**
     * 
     * @param {{text: string, icon_url: string}} object 
     * @returns {EmbedStructure}
     */
    setFooter(object) {
        this.footer = object
        return this
    }
    /**
     * 
     * @param {EmbedStructure} json 
     */
    constructor(json) {
        if (typeof json === 'object') {
            for (const entry of Object.entries(json)) {
                this[entry[0]] = entry[1]
            }
        }
    }
}

class Text {
    /**
     * 
     * @returns {string}
     */
    capitalize() {
        if (typeof this.word === 'object') {
            const newArray = []
            for (let word of this.word) {
                word = word.split('')
                word[0] = word[0].toUpperCase()
                word = word.join('')
                newArray.push(word)
            }
            return newArray.join(' ')
        }
        this.word = this.word.split('')
        this.word[0] = this.word[0].toUpperCase()
        return this.word.join('')
    }
    /**
     * 
     * @param {string} word 
     */
    constructor(word) {
        this.word = word
    }
}

/**
 * @enum {{name: string, buffer: Buffer}}
 */
const fileStructure = {}

module.exports = {
    Emoji,
    Embed,
    Button,
    Text,
    ButtonStyles,
    EmbedStructure,
    fileStructure
}