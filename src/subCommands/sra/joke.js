const { Command } = require("eris");
const { SRA_Fetch } = require("../../../utils/functions");
const { reply } = require("../../../utils/methods");
const { Embed } = require("../../../utils/classes");

module.exports = new Command('joke',
    /**
     * 
     * @param {Message} message 
     */
    async function (message) {
        const { joke } = await SRA_Fetch('others', 'joke')
        await reply(message, {
            embeds: [
                new Embed({
                    title: 'Joke',
                    description: `\`\`\`${joke}\`\`\``
                })
            ]
        })
    },
    {
        description: 'Show a joke',
        usage: 'sra joke'
    })