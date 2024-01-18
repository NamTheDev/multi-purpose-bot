const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { readFileSync, readdirSync } = require("fs");
const { SelectMenu, ActionRow, Text } = require("../../../utils/classes");
const { join } = require("path");
const { InteractionCollector } = require("../../../utils/collectors");
const { getPrefix } = require("../../../utils/functions");
const { CommandInteraction } = require("eris");
const { ApplicationCommand } = require("../../../utils/classes");

module.exports = new ApplicationCommand({
    name: 'help',
    description: 'Send help menu',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {string[]} args 
     */
    execute: async (interaction, args) => {
        const commands = await client.getCommands()
        const prefix = await getPrefix(client)
        let helpSlashCommand = commands.find(command => command.name === 'help')
        helpSlashCommand = `</${helpSlashCommand.name}:${helpSlashCommand.id}>`
        let pingSlashCommand = commands.find(command => command.name === 'ping')
        pingSlashCommand = `</${pingSlashCommand.name}:${pingSlashCommand.id}>`
        const authorName = interaction.user.username
        const toReplaceItems = { prefix, helpSlashCommand, pingSlashCommand, authorName }
        const helpMenuPages = readdirSync(join(process.cwd(), 'md', 'help_menu_pages')).map(fileName => fileName.split(".")[0])
        const pages = helpMenuPages.map(page => {
            const pageContent = readFileSync(join(process.cwd(), 'md', 'help_menu_pages', `${page}.md`), 'utf-8')
            return { name: page, content: pageContent }
        })
        const embeds = [];
        function extractEmbed(inputString) {
            const content = [];
            let insideBracket = false;
            let currentContent = '';
            let outsideContent = '';

            for (const char of inputString) {
                if (char === '[') {
                    insideBracket = true;
                    if (outsideContent.trim() !== '') {
                        content.push(outsideContent.trim());
                    }
                    outsideContent = '';
                    currentContent = '';
                } else if (char === ']' && insideBracket) {
                    insideBracket = false;
                    embeds.push(currentContent.trim());
                    currentContent = '';
                } else if (insideBracket) {
                    currentContent += char;
                } else {
                    outsideContent += char;
                }
            }

            // If there is content outside the last bracket, add it to the outside array
            if (outsideContent.trim() !== '') {
                content.push(outsideContent.trim());
            }
            return content;
        }
        for (const pageIndex in pages) {
            const page = pages[pageIndex]
            const matches = page.content.match(/\{(.*?)\}/g);
            if (!matches) {
                continue;
            }
            for (const match of matches) {
                pages[pageIndex].content = page.content.split(match).join(toReplaceItems[match.substring(1, match.length - 1)])
            }
        }
        for (const page of pages) {
            const content = extractEmbed(page.content)
            page.content = content
        }
        const helpMenuMarkdown = pages.find(page => page.name === 'main_page')
        await interaction.acknowledge()
        await reply(interaction, {
            content: helpMenuMarkdown.content,
            components: [
                new ActionRow(
                    new SelectMenu({
                        type: 'Text',
                        custom_id: 'help_menu_pages',
                        options: helpMenuPages.filter(pageName => pageName !== 'main_page').map((pageName, index) => {
                            return {
                                label: new Text(pageName.split('_').join(" ")).capitalize(),
                                value: index
                            }
                        }),
                        placeholder: 'Select a page'
                    })
                )
            ],
            embeds: embeds.map(embedContent => ({ description: embedContent }))
        })
        const collector = new InteractionCollector({ interaction })
        collector.onCollect(async (interaction) => {
            if (!interaction.acknowledged) await interaction.defer(64);
            const page = pages[Number(interaction.data.values[0])]
            return await reply(interaction, page)
        })
    }
})