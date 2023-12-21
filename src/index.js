const { Client } = require('eris')
const { readdirSync } = require('fs')
require('dotenv')
    .config()
const client = new Client(process.env.TOKEN, {
    intents: ['all']
})
module.exports = client

const categories = readdirSync(`${__dirname}/commands`)
const commands = []
for (const category of categories) {
    for (const commandFile of readdirSync(`${__dirname}/commands/${category}`)) {
        const commandData = require(`${__dirname}/commands/${categories}/${commandFile}`)
        commands.push(commandData)
    }
}

const events = readdirSync(`${__dirname}/events`)
for (const eventFile of events) {
    require(`${__dirname}/events/${eventFile}`)
}



client.connect();