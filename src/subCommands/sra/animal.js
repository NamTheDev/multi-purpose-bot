const { Command, Message } = require("eris");
const { Embed, Text } = require("../../../utils/classes");
const { SRA_Fetch } = require("../../../utils/functions");
const { randomNumber } = require("multi-purpose");
const { reply } = require("../../../utils/methods");
module.exports = new Command('animal',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args, prefix) {
        const animals = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda', 'random']
        if (!animals.includes(args[0]))
            return await reply(message, `# Available usage:\n${animals.map((animal, index) => `${index + 1}. \`\`\`${prefix} sra animal ${animal}\`\`\``).join('\n')}`)
        const animal = args[0] === 'random' ? animals[await randomNumber(animals.length - 1)] : args[0];
        let { image, fact } = await SRA_Fetch('animal', animal)
        const title = new Text(animal.replace('_', ' ').split(' ')).capitalize()
        return await reply(message, {
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