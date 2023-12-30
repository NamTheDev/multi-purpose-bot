const { Command, Client } = require("eris");
const { readdirSync } = require("fs");
const { default: fetch } = require("node-fetch");
const { join } = require("path");

/**
 * 
 * @param {Command} command 
 * @returns {{subCommands: Array.<Command>}}
 */
function getSubcommands(command) {
    const subCommands = readdirSync(join(__dirname.replace('utils', ''), 'src', 'subCommands', command))
        .map(subCommandFile => require(join(__dirname.replace('utils', ''), 'src', 'subCommands', command, subCommandFile)))
    return { subCommands }
}

/**
 * 
 * @param {number} size 
 * @param {any[]} array 
 * @returns {any[]}
 */
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

/**
 * 
 * @param {'animal' | 'animu' | 'canvas/filter' | 'canvas/misc' | 'canvas/overlay' | 'facts' | 'img' | 'others' | 'pokemon' | 'premium' | 'chatbot' | 'welcome'} category 
 * @param {string} endpoint 
 * @param {string} query 
 * @returns {object}
 */
async function SRA_Fetch(category, endpoint, query) {
    const response = await fetch(`https://some-random-api.com/${category}/${endpoint}?${query ? query.join('&') : ''}`)
    const data = await response.json()
    return data
}

/**
 * 
 * @param {Client} client 
 * @returns {string}
 */
function getPrefix(client) { return `@${client.user.username}#${client.user.discriminator}` }

module.exports = {
    SRA_Fetch,
    chunkArray,
    getSubcommands,
    getPrefix
}