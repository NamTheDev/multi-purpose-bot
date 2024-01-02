const { CommandClient } = require('eris')
const { readdirSync } = require('fs')
require('dotenv')
    .config()
const client = new CommandClient(process.env.TOKEN, {
    intents: ['all']
}, {
    defaultHelpCommand: false,
    defaultCommandOptions: {
        guildOnly: true
    }
})

const data = require('./data.json')
module.exports = { client, data }

const categories = readdirSync(`${__dirname}/commands`)
for (const category of categories) {
    for (const commandFile of readdirSync(`${__dirname}/commands/${category}`)) {
        const commandData = require(`${__dirname}/commands/${category}/${commandFile}`)
        const defaultCommandOptionKeys = Object.entries(client.commandOptions.defaultCommandOptions)
        for (const defaultOption of defaultCommandOptionKeys) {
            const key = defaultOption[0]
            const value = defaultOption[1]
            commandData[key] = value
        }
        client.registerCommand(commandData.label, commandData.execute, commandData)
    }
}

const events = readdirSync(`${__dirname}/events`)
for (const eventFile of events) {
    require(`${__dirname}/events/${eventFile}`)
}

client.connect();