const { client, commands } = require("..")

client.on('messageCreate', async (message) => {
    const args = message.content
        .replace(`<@${client.user.id}>`, '')
        .split(' ')
        .filter(arg => arg !== '')
    const cmd = args[0]
    args.shift()
    const command = commands.find(command => command.name === cmd)
    if (command) await command.callback(client, message, args);
})