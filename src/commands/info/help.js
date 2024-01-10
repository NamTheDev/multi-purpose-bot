const { Message, Command } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { readFileSync, readdirSync } = require("fs");
const { SelectMenu, ActionRow, Text } = require("../../../utils/structures");
const { join } = require("path");
const { InteractionCollector } = require("../../../utils/collectors");

module.exports = new Command('help',
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async function (message, args) {
        const commands = await client.getCommands()
        const prefix = message.prefix
        const helpSlashCommand = commands.find(command => command.name === 'help')
        const pingSlashCommand = commands.find(command => command.name === 'ping')
        const helpMenuMarkdown = readFileSync(join(process.cwd(), 'md', 'help_menu.md'), 'utf-8')
        const helpMenuPages = readdirSync(join(process.cwd(), 'md', 'help_menu_pages')).map(fileName => fileName.split(".")[0])
        await reply(message, {
            content: helpMenuMarkdown.replace('{authorName}', message.author.username),
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
                        })
                    })
                )
            ]
        })
        const collector = new InteractionCollector({ message })
        collector.onCollect(async (interaction) => {
            const page = readFileSync(join(process.cwd(), 'md', 'help_menu_pages', helpMenuPages[interaction.data.values[0]])+'.md', 'utf-8')
            const matches = str.match(/\{(.*?)\}/g);
            await interaction.defer(64)
            return await reply(interaction, page)
        })
    },
    {
        description: 'Send help menu'
    }
)