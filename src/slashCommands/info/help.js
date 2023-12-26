const { Message, Client, Command } = require("eris");

module.exports = {
    data: 'help',
    callback:
        /**
         * 
         * @param {Client} client 
         * @param {Message} message 
         * @param {string[]} args 
         * @returns 
         */
        async (client, message, args) => {
            return message.channel.createMessage(`# Pong! 🏓\n\`\`\`${message.timestamp - Date.now()}ms\`\`\``)
        }
}