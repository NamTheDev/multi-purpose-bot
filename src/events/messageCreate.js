const { client, messageCollection } = require("..")
const { getPrefix } = require("../../utils/functions")
const { reply } = require("../../utils/methods");
const { ChannelTypes } = require("../../utils/structures");
client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    const collect = messageCollection.get('collect' + message.author.id + message.channel.id)
    if(collect && message.channel.type === ChannelTypes['GuildText']) {
        const filter = messageCollection.get('filter' + message.author.id + message.channel.id)
        if(typeof filter === 'function') {
            if(!filter(message)) return;
        }
        await collect(message)
    }
    if(message.channel.type === ChannelTypes['DM']) {
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