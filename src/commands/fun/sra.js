const { Command, Message } = require("eris");
const { default: fetch } = require("node-fetch");
async function Fetch(category, endpoint, query) {
    const response = await fetch(`https://some-random-api.com/${category}/${endpoint}?${query.join('&')}`)
    const data = await response.json()
    return data
}
const subCommands = [
    new Command('lyrics',
        /**
         * 
         * @param {Message} message 
         * @param {string[]} args 
         */
        async function (message, args) {
            args.shift()
            try {
                const {lyrics, error} = await Fetch('others', 'lyrics', [`title=${args[0]}`])
                if(error) throw (error);
                const arrayOfLyrics = lyrics.split('\n')

                function chunkArray(size, array) {
                    let num = 0;
                    const result = [];
                    let copy = [...array];

                    while (copy.length !== 0) {
                        result.push(copy.splice(0, size).filter(item => item !== ''));
                        num += size;
                    }

                    return result;
                }

                const chunkedArray = chunkArray(5, arrayOfLyrics);
                for (const lyricsArray of chunkedArray) {
                    await message.channel.createMessage(`${lyricsArray.join(' ')}\n`)
                }
            } catch (e) {
                await message.channel.createMessage({
                    embed: {
                        title: 'Error:',
                        description: `\`\`\`${e}\`\`\``,
                        color: 15548997
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