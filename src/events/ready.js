const { client } = require("..");

client.on('ready', () => {
    console.log('\n')
    console.log('Message status:        Bot is ready.')
    console.log(`Bot username:          ${client.user.username}`)
    console.log(`Bot ID:                ${client.user.id}`)
    console.log('\n')
})