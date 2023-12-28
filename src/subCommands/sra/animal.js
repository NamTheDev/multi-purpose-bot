const { Command, Message } = require("eris");
const { default: fetch } = require("node-fetch");
const { Embed, Text } = require("../../../utils/structures");
const { SRA_Fetch } = require("../../../utils/functions");
module.exports = new Command('animal',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const animals = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda']
        if (!animals.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${animals.map((animal, index) => `${index + 1}. \`\`\`@SKULL#5641 sra animal ${animal}\`\`\``).join('\n')}`)
        let { image, fact } = await SRA_Fetch('animal', args[0])
        const title = new Text(args[0].replace('_', ' ').split(' ')).capitalize()
        return await message.channel.createMessage({
            embed: new Embed({
                title,
                description: `**Fact**: ${fact}`,
                image: {
                    url: image
                },
                footer: {text: 'Warning: Some images may not being shown.'}
            })
        })
    }, {
    description: 'Show animal data',
    usage: 'sra animal <name>'
})