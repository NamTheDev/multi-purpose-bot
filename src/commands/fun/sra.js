const { Command, Message } = require("eris");
const Color = require("color");
const { client } = require("../..");
const { getSubcommands } = require("../../../utils/functions");
const { Embed } = require("../../../utils/structures");
const { subCommands } = getSubcommands('sra')
const command = new Command('some-random-api',
    /**
     * 
     * @param {Message} message
     * @param {string[]} args 
     */
    async function (message, args) {
        const subCommand = subCommands.find(subCommand => subCommand.label === args[0])
        if (subCommand) {
            args.shift()
            try {
                return await subCommand.executeCommand(message, args)
            } catch (e) {
                if(`${e}`.toLowerCase().includes('typeerror')) console.log(e);
                return await message.channel.createMessage({
                    embed: new Embed({
                        title: 'Error:',
                        description: `\`\`\`${e}\`\`\``,
                        color: Color({ keyword: 'red' }).rgbNumber()
                    })
                })
            }
        }
        return await message.channel.createMessage({ content: `# Some random API command\n## Available subcommands:\n${subCommands.map((cmd, index) => `${index+1}. **${cmd.label}** - ${cmd.description}\n> \`\`\`@SKULL#5641 ${cmd.usage}\`\`\``).join('\n')}` })
    },
    {
        aliases: ['sra']
    }
)
for (const subCommand of subCommands) {
    command.registerSubcommand(subCommand.label, subCommand.execute, subCommand)
}
module.exports = command