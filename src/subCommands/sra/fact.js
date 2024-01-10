const { Command, Message } = require("eris");
const { Embed, Text } = require("../../../utils/structures");
const { SRA_Fetch } = require("../../../utils/functions");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
module.exports = new Command('fact',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const prefix = message.prefix
        const animals = ['bird', 'cat', 'dog', 'fox', 'koala', 'panda', 'random']
        if (!animals.includes(args[0]))
            return await reply(message, `# Available usage:\n${animals.map((animalName, index) => `${index + 1}. \`\`\`${prefix} sra fact ${animalName}\`\`\``).join('\n')}`)
        const animal = args[0] === 'random' ? animals[await randomNumber(animals.length - 1)] : args[0];
        let { fact } = await SRA_Fetch('facts', animal)
        const title = new Text(animal.replace('_', ' ').split(' ')).capitalize()
        return await reply(message, {
            embed: new Embed({
                title,
                description: `**Fact**: \`\`\`${fact}\`\`\``
            })
        })
    }, {
    description: 'Show an animal fact',
    usage: 'sra fact <animal>'
})