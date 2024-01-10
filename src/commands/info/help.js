const { Message, Command } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { readFileSync, readdirSync } = require("fs");
const { SelectMenu, ActionRow, Text } = require("../../../utils/structures");
const { join } = require("path");
const { InteractionCollector } = require("../../../utils/collectors");
const { getPrefix } = require("../../../utils/functions");

module.exports = new Command('help',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        const commands = await client.getCommands()
        const prefix = await getPrefix(client)
        let helpSlashCommand = commands.find(command => command.name === 'help')
        helpSlashCommand = `</${helpSlashCommand.name}:${helpSlashCommand.id}>`
        let pingSlashCommand = commands.find(command => command.name === 'ping')
        pingSlashCommand = `</${pingSlashCommand.name}:${pingSlashCommand.id}>`
        const toReplaceItems = { prefix, helpSlashCommand, pingSlashCommand }
        const helpMenuMarkdown = readFileSync(join(process.cwd(), 'md', 'help_menu.md'), 'utf-8')
        const helpMenuPages = readdirSync(join(process.cwd(), 'md', 'help_menu_pages')).map(fileName => fileName.split(".")[0])
        await reply(message, {
            content: helpMenuMarkdown
                .replace('{authorName}', message.author.username)
                .replace('{helpSlashCommand}', helpSlashCommand)
                .split('{prefix}').join(prefix),
            components: [
                new ActionRow(
                    new SelectMenu({
                        type: 'Text',
                        custom_id: 'help_menu_pages',
                        options: helpMenuPages.map((pageName, index) => {
                            return {
                                label: new Text(pageName.split('_').join(" ")).capitalize(),
                                value: index
                            }
                        }),
                        placeholder: 'Select a page'
                    })
                )
            ]
        })
        const collector = new InteractionCollector({ message })
        collector.onCollect(async (interaction) => {
            if (!interaction.acknowledged) await interaction.defer(64);
            let page = readFileSync(join(process.cwd(), 'md', 'help_menu_pages', helpMenuPages[interaction.data.values[0]]) + '.md', 'utf-8')
            const matches = page.match(/\{(.*?)\}/g);
            if (!matches) return await reply(interaction, page)
            for (const match of matches) {
                page = page.split(match).join(toReplaceItems[match.substring(1, match.length - 1)])
            }
            return await reply(interaction, page)
        })
    },
    {
        description: 'Send help menu'
    }
)