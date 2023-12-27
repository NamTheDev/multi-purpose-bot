const { Client, Message, Command } = require("eris");
const { MessageCollector } = require("eris-collects");
const ms = require("ms");
const getScrambledWordQuestions = require("multi-purpose/utils/getScrambledWordQuestions");
const { client } = require("../..");

module.exports = new Command('scramble',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        console.log(args)
        const scramble = await getScrambledWordQuestions({ words: 10 })
        const { original, scrambled } = scramble[Math.floor(scramble.length * Math.random())]
        const time = '10'
        const collector = new MessageCollector(client, {
            channel: message.channel,
            filter: (msg) => msg.author.id === message.author.id,
            time: ms(`${time} seconds`)
        })
        await message.channel.createMessage(
            {
                content: `# Scrambled word game! Guess the word:\n\`\`\`${scrambled}\`\`\`\n> You only have **${time} seconds** left so quick!`
            }
        )
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
    }, { description: 'Guess the scrambled word', fullDescription: 'A game for guessing scrambled word.\n> **Words are generated using this API**: https://random-word-api.vercel.app.' })