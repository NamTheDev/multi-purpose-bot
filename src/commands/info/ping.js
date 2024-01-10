const { Message, Command } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");

module.exports = new Command('ping',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        return await reply(message, `# Pong! 🏓\n\`\`\`${Date.now() - message.timestamp}ms\`\`\``)
    },
    {
        description: 'Ping pong command'
    }
)