const { readdirSync } = require("fs")
const { client, baseDirname } = require("..")
const { join } = require("path")

const categories = readdirSync(join(baseDirname, 'commands'))
for (const category of categories) {
    for (const commandFile of readdirSync(join(baseDirname, 'commands', category))) {
        const commandData = require(join(baseDirname, 'commands', category, commandFile))
        const defaultCommandOptionKeys = Object.entries(client.commandOptions.defaultCommandOptions)
        for (const defaultOption of defaultCommandOptionKeys) {
            const key = defaultOption[0]
            const value = defaultOption[1]
            commandData[key] = value
        }
        client.registerCommand(commandData.label, commandData.execute, commandData)
    }
}