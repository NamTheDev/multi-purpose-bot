const { Message, Client } = require("eris");

module.exports = {
    name: 'ping',
    callback:
        /**
         * 
         * @param {Client} client 
         * @param {Message} message 
         * @param {string[]} args 
         * @returns 
         */
        async (client, message, args) => {
            return message.channel.createMessage(`# Pong! 🏓\n\`\`\`${Date.now() - message.timestamp}ms\`\`\``)
        }
}