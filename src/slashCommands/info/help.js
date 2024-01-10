const { CommandInteraction } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { applicationCommand } = require("../../../utils/structures");

module.exports = new applicationCommand({
    name: 'help',
    description: 'Send help menu',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {string[]} args 
     */
    execute: async function (interaction, args) {
    }
})