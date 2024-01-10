const { CommandInteraction } = require("eris");
const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { applicationCommand } = require("../../../utils/structures");

module.exports = new applicationCommand({
    name: 'ping',
    description: "Got bot's ping",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {string[]} args
     */
    execute: async function (interaction, args) {
        await interaction.defer()
        return await reply(interaction, `# Pong! 🏓\n\`\`\`${Date.now() - interaction.createdAt}ms\`\`\``)
    }
})