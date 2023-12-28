const { Command, Message } = require("eris");

module.exports = new Command('animu',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const img = ['face-palm', 'hug', 'pat', 'quote', 'wink']
        if (!img.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${img.map((img, index) => `${index + 1}. \`\`\`@SKULL#5641 sra img ${img}\`\`\``).join('\n')}`)
        let { link } = await SRA_Fetch('img', args[0])
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
    description: 'Send anime stuff',
    usage: 'sra animu <>'
})