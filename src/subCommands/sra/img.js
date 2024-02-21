const { Command, Message } = require("eris");
const { default: fetch } = require("node-fetch");
const { Text, Embed } = require("../../../utils/classes");
const { SRA_Fetch } = require("../../../utils/functions");
const { reply } = require("../../../utils/methods");

module.exports = new Command('img',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function ({message, args, prefix}) {
        const imgs = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda', 'pikachu', 'whale', 'kangaroo', 'random']
        if (!img.includes(args[0]))
            return await reply(message, `# Available usage:\n${img.map((img, index) => `${index + 1}. \`\`\`${prefix} sra img ${img}\`\`\``).join('\n')}`)
        const img = args[0] === 'random' ? imgs[await randomNumber(imgs.length - 1)] : args[0];
        let { link } = await SRA_Fetch('img', img)
        const title = new Text(img.replace('_', ' ').split(' ')).capitalize()
        if ((await (await fetch(link)).text()).startsWith('<!DOCTYPE html>'))
            throw 'Image / GIF not available.';
        return await reply(message, {
            embed: new Embed({
                title,
                image: {
                    url: link
                }
            })
        })
    }, {
    description: 'Show image / GIF',
    usage: 'sra img <name>'
})