const { Command, Message } = require("eris");
const { default: fetch } = require("node-fetch");
const { Embed, Text } = require("../../../utils/structures");
const { SRA_Fetch } = require("../../../utils/functions");
module.exports = new Command('img',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const img = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda', 'pikachu', 'whale', 'kangaroo']
        if (!img.includes(args[0]))
            return await message.channel.createMessage(`# Available usage:\n${img.map((img, index) => `${index + 1}. \`\`\`@SKULL#5641 sra img ${img}\`\`\``).join('\n')}`)
        let { link } = await SRA_Fetch('img', args[0])
        const title = new Text(args[0].replace('_', ' ').split(' ')).capitalize()
        if((await (await fetch(link)).text()).startsWith('<!DOCTYPE html>'))
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
    description: 'Show image / gif',
    usage: 'sra img <name>'
})