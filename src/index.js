const { CommandClient } = require('eris')
const { readdirSync } = require('fs')
const { join } = require('path')
const data = require('./data.json')
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

const messageCollection = new Map()
const interactionCollection = new Map()
const slashCommandCallbackCollection = new Map()
module.exports = { client, data, messageCollection, interactionCollection, slashCommandCallbackCollection, baseDirname: __dirname }
const handlers = readdirSync(join(__dirname, 'handlers'))
for ( const handlerFile of handlers) {
    require(join(__dirname, 'handlers', handlerFile))
}
client.connect();