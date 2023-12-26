const { Message, Command } = require("eris");
const { client } = require("../..");

module.exports = new Command('ping',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        return message.channel.createMessage(`# Pong! 🏓\n\`\`\`${Date.now() - message.timestamp}ms\`\`\``)
    },
    {
        description: 'Ping pong command'
    }
)