const { Command, Message } = require("eris");
const { client } = require("../..");
const { getPrefix, SRA_Fetch } = require("../../../utils/functions");
const { Text, Embed } = require("../../../utils/structures");
const { default: fetch } = require("node-fetch");

module.exports = new Command('animu',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const prefix = getPrefix(client)
        const animu = ['face-palm', 'hug', 'pat', 'quote', 'wink']
        if (!animu.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${animu.map((animu, index) => `${index + 1}. \`\`\`${prefix} sra animu ${animu}\`\`\``).join('\n')}`)
        const animuData = await SRA_Fetch('animu', args[0])
        if (args[0] !== 'quote' && (await (await fetch(animuData.link)).text()).startsWith('<!DOCTYPE html>'))
            throw 'Image / GIF not available.';
        const embed = new Embed()
        if (args[0] === 'quote') {
            const { character, anime, sentence } = animuData
            embed.setTitle(`animu ${args[0]}`)
            embed.setDescription(`"*${sentence}*"\n\n> **Quote by**:\`\`\`${character}\`\`\`\n> **From anime**:\`\`\`${anime}\`\`\``)
        }
        return await message.channel.createMessage({ embed })
    }, {
    aliases: ['anime'],
    description: 'Send anime quote or GIF',
    usage: 'sra animu <type>'
})