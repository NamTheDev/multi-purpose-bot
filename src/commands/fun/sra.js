const { Command, Message } = require("eris");
const Color = require("color");
const { getSubcommands } = require("../../../utils/functions");
const { Embed } = require("../../../utils/structures");
const { reply } = require("../../../utils/methods");
const { client } = require("../..");
const { subCommands } = getSubcommands('sra')
const command = new Command('some-random-api',
    /**
     * 
     * @param {Message} message
     * @param {string[]} args 
     */
    async function (message, args) {
        const prefix = message.prefix
        const subCommand = subCommands.find(subCommand => subCommand.label === args[0])
        if (subCommand) {
            args.shift()
            try {
                return await subCommand.executeCommand(message, args)
            } catch (e) {
                if(`${e}`.toLowerCase().includes('typeerror')) console.log(e);
                return await reply(message, {
                    embed: new Embed({
                        title: 'Error:',
                        description: `\`\`\`${e}\`\`\``,
                        color: Color({ keyword: 'red' }).rgbNumber()
                    })
                })
            }
        }
        return await reply(message, { content: `# Some random API command\n## Available subcommands:\n${subCommands.map((cmd, index) => `${index+1}. **${cmd.label}** - ${cmd.description}\n> \`\`\`${prefix} ${cmd.usage}\`\`\``).join('\n')}` })
    },
    {
        aliases: ['sra'],
        description: 'Generating data from some-random-api'
    }
)
for (const subCommand of subCommands) {
    subCommand.parentCommand = command
    command.registerSubcommand(subCommand.label, subCommand.execute, subCommand)
}
module.exports = command