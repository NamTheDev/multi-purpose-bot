const ApplicationCommandStructure = require("../structures/ApplicationCommandStructure")
const { ApplicationCommandTypes } = require("../types")

class ApplicationCommand {
    /**
     * 
     * @param {ApplicationCommandStructure} json 
     * @returns 
     */
    constructor(json) {
        if (json.options) {
            json.options = json.options.map(option => {
                option.type = applicationCommandOptionTypes[option.type] || option.type
                option.channel_types = option.channel_types.map(type => ChannelTypes[type])
                return option
            })
        }
        json.type = ApplicationCommandTypes[json.type] || json.type
        return json
    }
}
module.exports = ApplicationCommand