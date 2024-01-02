const { Command, Message } = require("eris");
const { chunkArray, SRA_Fetch, getPrefix } = require("../../../utils/functions");
const { Embed, Button, ButtonStyles, Emoji } = require("../../../utils/structures");
const { reply } = require("../../../utils/methods");

module.exports = new Command('lyrics',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function (message, args) {
        const { lyrics, title, author, thumbnail, links, disclaimer, error } = await SRA_Fetch('others', 'lyrics', [args.join(' ') ? `title=${args.join(' ')}` : ''])
        if (error) throw (error);
        const thumbnailUrl = thumbnail.genius
        const geniusLink = links.genius
        const arrayOfLyrics = lyrics.split('\n')
        const chunkedArray = chunkArray(20, arrayOfLyrics);
        const defaultEmbed = new Embed({
            title: `*${title}* - **${author}**`,
            url: geniusLink,
            description: '> ⚠️ **Disclaimer** ⚠️:\n' + disclaimer,
            thumbnail: {
                url: thumbnailUrl
            }
        })
        const embeds = []
        for (const lyricsArray of chunkedArray) {
            embeds.push(new Embed({ description: `${lyricsArray.join('\n')}` }))
        }
        await reply(message, {
            embeds: [
                defaultEmbed,
                embeds[0]
            ]
        })
    },
    {
        description: 'Show lyrics',
        usage: 'sra lyrics <title>'
    })