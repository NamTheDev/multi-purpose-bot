const { readdirSync } = require("fs")
const { client, baseDirname, slashCommandCallbackCollection } = require("..")
const { join } = require("path")

const categories = readdirSync(join(baseDirname, 'slashCommands'))
client.on('ready', async () => {
for (const category of categories) {
    for (const commandFile of readdirSync(join(baseDirname, 'slashCommands', category))) {
        const commandData = require(join(baseDirname, 'slashCommands', category, commandFile))
        slashCommandCallbackCollection.set(commandData.name, commandData)
            commandData.application = {id: client.application.id}
            const applicationCommands = await (await client.getCommands()).find(command => 
                command.name === commandData.name &&
                command.description === commandData.description &&
                command.options === commandData.options        
                )
            if(applicationCommands) return;
            console.log('Loaded slash command: '+commandData.name)
            await client.createCommand(commandData)
    }
}
})