const { Command } = require("eris");
const { SRA_Fetch } = require("../../../utils/functions");
const { reply } = require("../../../utils/methods");
const { Embed } = require("../../../utils/classes");

module.exports = new Command('dictionary',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const { word, definition, error } = await SRA_Fetch('others', 'dictionary', [`word=${args[0]}`])
        if (error) throw (error);
        await reply(message, {
            embeds: [
                new Embed({
                    title: `Word: ${word}`,
                    description: `**Definition**:\n${definition}`
                })
            ]
        })
    },
    {
        description: 'Show a word definition',
        usage: 'sra dictionary <word>'
    })