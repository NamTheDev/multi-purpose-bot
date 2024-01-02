const { client } = require("..")
const { getPrefix } = require("../../utils/functions")
const { reply } = require("../../utils/methods")
client.on('messageCreate', async (message) => {
    console.log(client._events)
    if(client._events.messageCollect) return await client._events.messageCollect(message);
    if(!message.guildID) {
        try{
        message.channel = await message.author.getDMChannel()
        return await reply(message, '# Hello there!\nAre you trying to use the bot in DM? If yes, please type `/` for slash commands.\n> **NOTICE:** Bot commands are NOT available in DM.')
        }catch(e){
            return;
        }
    }
    const prefix = getPrefix(client)
    const botMention = message.mentions.find(user => user.id === client.user.id)
    const onlyMention = message.content.split(' ').length > 1 ? false : true
    if (botMention && onlyMention) {
        return await reply(message, `# Hello there!\nAre you trying to use the bot? If yes, then use: \`\`\`${prefix} help\`\`\``)
    }
})