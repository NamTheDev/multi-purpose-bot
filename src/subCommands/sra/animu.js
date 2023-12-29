const { Command, Message } = require("eris");
const { client } = require("../..");

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
        let { link } = await SRA_Fetch('animu', args[0])
        const title = new Text(args[0].replace('_', ' ').split(' ')).capitalize()
        if ((await (await fetch(link)).text()).startsWith('<!DOCTYPE html>'))
            throw 'Image / GIF not available.';
        return await message.channel.createMessage({
            embed: new Embed({
                title,
                image: {
                    url: link
                }
            })
        })
    }, {
    aliases: ['anime'],
    description: 'Send anime quote or GIF',
    usage: 'sra animu <type>'
})