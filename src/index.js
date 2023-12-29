const { CommandClient } = require('eris')
const { readdirSync } = require('fs')
require('dotenv')
    .config()
const client = new CommandClient(process.env.TOKEN, {
    intents: ['all']
}, {
    defaultHelpCommand: false
})

module.exports = { client }

const categories = readdirSync(`${__dirname}/commands`)
for (const category of categories) {
    for (const commandFile of readdirSync(`${__dirname}/commands/${category}`)) {
        const commandData = require(`${__dirname}/commands/${category}/${commandFile}`)
        client.registerCommand(commandData.label, commandData.execute, commandData)
    }
}

const events = readdirSync(`${__dirname}/events`)
for (const eventFile of events) {
    require(`${__dirname}/events/${eventFile}`)
}
client.connect();