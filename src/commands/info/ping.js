const { Message, Command } = require("eris");
const { client } = require("../..");

module.exports = new Command('ping',
    /**
     * 
     * @param {Mesasge} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        return message.channel.createMessage(`# Pong! 🏓\n\`\`\`${Date.now() - message.timestamp}ms\`\`\``)
    },
    {
        description: 'ping pong command'
    }
)