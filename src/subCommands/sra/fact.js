const { Command, Message } = require("eris");
const { Embed, Text } = require("../../../utils/structures");
const { SRA_Fetch, getPrefix } = require("../../../utils/functions");
const { client } = require("../..");
module.exports = new Command('fact',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const prefix = getPrefix(client)
        const animals = ['bird', 'cat', 'dog', 'fox', 'koala', 'panda', 'random']
        if (!animals.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${animals.map((animalName, index) => `${index + 1}. \`\`\`${prefix} sra fact ${animalName}\`\`\``).join('\n')}`)
        const animal = args[0] === 'random' ? animals[await randomNumber(animals.length - 1)] : args[0];
        let { fact } = await SRA_Fetch('facts', animal)
        const title = new Text(animal.replace('_', ' ').split(' ')).capitalize()
        return await message.channel.createMessage({
            embed: new Embed({
                title,
                description: `**Fact**: \`\`\`${fact}\`\`\``
            })
        })
    }, {
    description: 'Show an animal fact',
    usage: 'sra fact <animal>'
})