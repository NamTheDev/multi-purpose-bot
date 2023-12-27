const { Command, Message } = require("eris");
const { chunkArray, SRA_Fetch, Embed, Button, ButtonStyles, Emoji } = require("../../../utils");
const Color = require('color');
const { client } = require("../..");
const subCommands = [
    new Command('lyrics',
        /**
         * 
         * @param {Message} message 
         * @param {string[]} args 
         */
        async function (message, args) {
            try {
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
                await message.channel.createMessage({
                    embeds: [
                        defaultEmbed,
                        embeds[0]
                    ],
                    components: [
                        new Button({ style: ButtonStyles.Primary, emoji: new Emoji('➡️'), custom_id: 'next_page' })
                    ]
                })
            } catch (e) {
                await message.channel.createMessage({
                    embed: {
                        title: 'Error:',
                        description: `\`\`\`${e}\`\`\``,
                        color: Color({ keyword: 'red' }).rgbNumber()
                    }
                })
            }
        },
        {
            description: 'show lyrics'
        }
    )
]
const command = new Command('some-random-api',
    /**
     * @param {Message} message 
     */
    async function (message, args) {
        const subCommand = subCommands.find(subCommand => subCommand.label === args[0])
        if (subCommand) {
            args.shift()
            return await subCommand.executeCommand(message, args)
        }
        return await message.channel.createMessage({ content: `# Some random API command\nAvailable subcommands:\`\`\`${subCommands.map(cmd => `${cmd.label} - ${cmd.description}\n`)}\`\`\`` })
    },
    {
        aliases: ['sra']
    }
)
for (const subCommand of subCommands) {
    command.registerSubcommand(subCommand.label, subCommand.execute, subCommand)
}
module.exports = command