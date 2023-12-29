const { client } = require("..")
const { getPrefix } = require("../../utils/functions")
const { reply } = require("../../utils/methods")
client.on('messageCreate', async (message) => {
    const prefix = getPrefix(client)
    const botMention = message.mentions.find(user => user.id === client.user.id)
    const onlyMention = message.content.split(' ').length > 1 ? false : true
    if (botMention && onlyMention) {
        return await reply(message, `# Hello there!\nAre you trying to use the bot? If yes, then use: \`\`\`${prefix} help\`\`\``)
    }
})