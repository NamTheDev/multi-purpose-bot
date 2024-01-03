const { readdirSync } = require("fs")
const { join } = require("path")
const { baseDirname } = require("..")
const events = readdirSync(join(baseDirname, 'events'))
for (const eventFile of events) {
    require(join(baseDirname, 'events', eventFile))
}