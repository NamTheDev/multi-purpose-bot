const { Command, Message, ComponentInteraction } = require("eris");
const { chunkArray, SRA_Fetch, getPrefix } = require("../../../utils/functions");
const { Embed, Button, ButtonStyles, Emoji, ActionRow } = require("../../../utils/structures");
const { reply } = require("../../../utils/methods");
const { InteractionCollector } = require("../../../utils/collectors");
const ms = require("ms");
const { client } = require("../..");

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
        const row = new ActionRow(
            new Button({
                emoji: new Emoji('⬅'),
                custom_id: 'previous_page',
                style: ButtonStyles['Primary'],
                disabled: true
            }),
            new Button({
                emoji: new Emoji('➡'),
                style: ButtonStyles['Primary'],
                custom_id: 'next_page'
            })
        )
        for (const lyricsArray of chunkedArray) {
            embeds.push(new Embed({ description: `${lyricsArray.join('\n')}` }))
        }
        await reply(message, {
            embeds: [
                defaultEmbed,
                embeds[0]
            ],
            components: [row]
        })
    },
    {
        description: 'Show lyrics',
        usage: 'sra lyrics <title>'
    })