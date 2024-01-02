const { Client, Channel, Message } = require("eris")
const { client } = require("../src")
class MessageCollector {
    stop(reason) {
        this.client.removeListener('messageCollect', async () => await this.onEndCallback(reason || 'No reason.'))
    }
    /**
     * 
     * @param {function(string)} callback 
     */
    onEnd(callback) {
        this.onEndCallback = callback
    }
    /**
     * 
     * @param {function(Message)} callback
     */
    onCollect(callback) {
        this.client.addListener('messageCollect', callback)
    }
    /**
     * 
     * @param {Client} client 
     * @param {{
     * channel: Channel,
     * filter: function(Message),
     * time: number
     * }} options 
     */
    constructor(client, options) {
        this.client = client
        this.channel = options.channel
        this.time = options.time
        this.filter = options.filter
    }
}
module.exports = {MessageCollector}