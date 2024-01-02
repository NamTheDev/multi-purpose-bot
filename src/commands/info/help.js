const { Message, Command } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { getPrefix } = require("../../../utils/functions");
const { readFileSync } = require("fs");

module.exports = new Command('help',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        const prefix = getPrefix(client)
        return reply(message, readFileSync('md/help_menu.md', 'utf-8')
            .replace('${prefix}', prefix)
            .replace('${helpSlashCommand}', `not yet`))
    },
    {
        description: 'Send help menu'
    }
)