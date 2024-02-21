const { Command, Message } = require("eris");
const { chunkArray, SRA_Fetch } = require("../../../utils/functions");
const { Embed, Button, Emoji, ActionRow } = require("../../../utils/classes");
const { reply } = require("../../../utils/methods");
const { InteractionCollector } = require("../../../utils/collectors");
const { ComponentTypes } = require("../../../utils/types");
const { ButtonStyles } = require("../../../utils/styles");

module.exports = new Command('lyrics',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async function ({message, args}) {
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
        let pageIndex = 0;
        const msg = await reply(message, {
            embeds: [
                defaultEmbed,
                embeds[pageIndex]
            ],
            components: [row]
        })
        const collect = new InteractionCollector({
            message,
            filter: (interaction) => interaction.user.id === message.author.id
        })
        async function switchPage(index, interaction, row) {
            if (index !== (embeds.length - 1) || index !== 0) row.components[0].disabled = false, row.components[1].disabled = false;
            if (index === 0) row.components[0].disabled = true;
            if (index === (embeds.length - 1)) row.components[1].disabled = true;
            await msg.edit({
                embeds: [
                    defaultEmbed,
                    embeds[index]
                ],
                components: [row]
            })
            console.log(index)
            await interaction.deferUpdate()
        }
        collect.onCollect(async (interaction) => {
            if (interaction.data.component_type === ComponentTypes['Button']) {
                const { custom_id } = interaction.data
                if (custom_id === 'next_page') {
                    pageIndex += 1
                    await switchPage(pageIndex, interaction, row)
                } else if (custom_id === 'previous_page') {
                    pageIndex -= 1
                    await switchPage(pageIndex, interaction, row)
                }
            }
        })
    },
    {
        description: 'Show lyrics',
        usage: 'sra lyrics <title>'
    })