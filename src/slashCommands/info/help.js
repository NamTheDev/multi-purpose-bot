const { client } = require("../..");
const { reply } = require("../../../utils/methods");
const { applicationCommand } = require("../../../utils/structures");

module.exports = new applicationCommand({
    name: 'help',
    description: 'Send help menu.',
    execute: async function (interaction, args) {
        await reply(interaction, 'hello')
    }
})