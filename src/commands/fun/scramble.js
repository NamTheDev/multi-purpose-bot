const { Client, Message } = require("eris");
const { MessageCollector } = require("eris-collects");
const { readFileSync } = require("fs");
const ms = require("ms");
const getScrambledWordQuestions = require("multi-purpose/utils/getScrambledWordQuestions");

module.exports = {
    name: 'scramble',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    callback: async (client, message, args) => {
        const scramble = await getScrambledWordQuestions({ words: 10 })
        const { original, scrambled } = scramble[Math.floor(scramble.length * Math.random())]
        const time = '10'
        const collector = new MessageCollector(client, {
            channel: message.channel,
            filter: (msg) => msg.author.id === message.author.id,
            time: ms(`${time} seconds`)
        })
        const image = readFileSync('src/assets/countdown.gif').toJSON().data
        console.log(image)
        await message.channel.createMessage({content: `# Scrambled word game! Guess the word:\n\`\`\`${scrambled}\`\`\`\n> You only have ${time} seconds left so quick!`, file: {name: 'countdown.gif', file: image}})
        await message.channel.sendTyping()
        collector.on('collect',
            /**
             * 
             * @param {Message} msg 
             */
            async (msg) => {
                if (msg.content === original) {
                    collector.stop('v')
                } else {
                    collector.stop('x')
                }
            })
        collector.on('end',
            async (messages, reason) => {
                if (['v', 'x'].includes(reason)) {
                    switch (reason) {
                        case 'v':
                            return message.channel.createMessage(`# You are correct.\n> The word is: **${original}**`)
                        case 'x':
                            return message.channel.createMessage(`# You are incorrect.\n> The word is: **${original}**`)
                    }
                } else {
                    return message.channel.createMessage(`# Out of time.\n> The word is: **${original}**`)
                }
            })
    }
}