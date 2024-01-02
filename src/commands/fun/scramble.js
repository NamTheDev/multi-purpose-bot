const { Message, Command } = require("eris");
const { MessageCollector } = require('../../../utils/collectors')
const ms = require("ms");
const { getScrambledWordQuestions } = require("multi-purpose");
const { client } = require("../..");

module.exports = new Command('scramble',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const scramble = await getScrambledWordQuestions({ words: 10 })
        const { original, scrambled } = scramble[Math.floor(scramble.length * Math.random())]
        const time = '10'
        await message.channel.createMessage(
            {
                content: `# Scrambled word game! Guess the word:\n\`\`\`${scrambled}\`\`\`\n> You only have **${time} seconds** left so quick!`
            }
        )
        const collector = new MessageCollector(client, {
            channel: message.channel,
            filter: (msg) => msg.author.id === message.author.id,
            time: ms(`${time} seconds`)
        })
        await message.channel.sendTyping()
        collector.onEnd(
            async (reason) => {
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
        collector.onCollect(
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
    }, { description: 'Guess the scrambled word', fullDescription: 'A game for guessing scrambled word.\n> **Words are generated using this API**: https://random-word-api.vercel.app.' })