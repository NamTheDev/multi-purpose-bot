const { readdirSync } = require("fs");
const { default: fetch } = require("node-fetch");
const { join } = require("path");

function chunkArray(size, array) {
    let num = 0;
    const result = [];
    let copy = [...array];

    while (copy.length !== 0) {
        result.push(copy.splice(0, size).filter(item => item !== ''));
        num += size;
    }

    return result.filter(array => array.length !== 0);
}

async function SRA_Fetch(category, endpoint, query) {
    const response = await fetch(`https://some-random-api.com/${category}/${endpoint}?${query ? query.join('&') : ''}`)
    const data = await response.json()
    return data
}

class Embed {
    /**
     * 
     * @param {{
     * color: number, 
     * title: string, 
     * url: string, 
     * author: { name: string, icon_url: string, url: string }, 
     * description: string, 
     * thumbnail: { url: string }, 
     * fields: Array.<{name: string, value: string, inline: boolean}>, 
     * image: { url: string }, 
     * timestamp: Date, 
     * footer: { text: string, icon_url: string }}} json 
     * @returns {object}
     */
    constructor(json) {
        return json
    }
}
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

function getSubcommands(command) {
    const subCommands = readdirSync(join(__dirname, 'src', 'subCommands', command))
        .map(subCommandFile => require(join(__dirname, 'src', 'subCommands', command, subCommandFile)))
    return {subCommands}
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

module.exports = {
    Emoji,
    Embed,
    Button,
    Text,
    ButtonStyles,
    SRA_Fetch,
    chunkArray,
    getSubcommands
}