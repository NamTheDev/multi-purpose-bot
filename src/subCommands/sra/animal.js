const { Command, Message } = require("eris");
const { Embed, Text } = require("../../../utils/structures");
const { SRA_Fetch, getPrefix } = require("../../../utils/functions");
const { client } = require("../..");
const { randomNumber } = require("multi-purpose");
module.exports = new Command('animal',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const prefix = getPrefix(client)
        const animals = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda', 'random']
        if (!animals.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${animals.map((animal, index) => `${index + 1}. \`\`\`${prefix} sra animal ${animal}\`\`\``).join('\n')}`)
        const animal = args[0] === 'random' ? animals[await randomNumber(animals.length - 1)] : args[0];
        let { image, fact } = await SRA_Fetch('animal', animal)
        const title = new Text(animal.replace('_', ' ').split(' ')).capitalize()
        return await message.channel.createMessage({
            embed: new Embed({
                title,
                description: `**Fact**: \`\`\`${fact}\`\`\``,
                image: {
                    url: image
                },
                footer: { text: 'Warning: Some images may not being shown.' }
            })
        })
    }, {
    description: 'Show animal data',
    usage: 'sra animal <name>'
})