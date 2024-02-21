const { readdirSync } = require("fs")
const { client, baseDirname, slashCommandCallbackCollection } = require("..")
const { join } = require("path")

const categories = readdirSync(join(baseDirname, 'slashCommands'))
client.on('ready', async () => {
for (const category of categories) {
    const commandFiles = readdirSync(join(baseDirname, 'slashCommands', category))
    for (const commandFile of commandFiles) {
        const commandData = require(join(baseDirname, 'slashCommands', category, commandFile))
        slashCommandCallbackCollection.set(commandData.name, commandData)
            commandData.application = {id: client.application.id}
            console.log('Loaded slash command: '+commandData.name)
            await client.createCommand(commandData)
    }
}
})