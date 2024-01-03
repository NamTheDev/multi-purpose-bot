const { Message, CommandInteraction, ComponentInteraction } = require("eris")
const { messageCollection, interactionCollection } = require("../src")
class MessageCollector {
    stop(reason) {
        messageCollection.set('stop' + this.userID + this.channelID, reason)
    }
    /**
     * 
     * @param {function(string)} callback 
     */
    onEnd(callback) {
        messageCollection.set('end' + this.userID + this.channelID, callback)
    }
    /**
     * 
     * @param {function(Message)} callback
     */
    onCollect(callback) {
        messageCollection.set('collect' + this.userID + this.channelID, callback)
    }
    /**
     * @param {{
     * message: Message | CommandInteraction,
     * filter: function(Message),
     * time: number
     * }} options 
     */
    constructor(options) {
        const { message } = options
        const userID = this.userID = message.author ? message.author.id : message.user.id
        const channelID = this.channelID = message.channel.id
        if (typeof options.filter === 'function') messageCollection.set('filter' + userID + channelID, options.filter);
        const interval = setInterval(async () => {
            const end = messageCollection.get('end' + userID + channelID)
            const stop = messageCollection.get('stop' + userID + channelID)
            if (stop) {
                messageCollection.delete('end' + userID + channelID)
                messageCollection.delete('stop' + userID + channelID)
                messageCollection.delete('collect' + userID + channelID)
                await end(stop)
                clearInterval(interval)
                clearTimeout(timeout)
            }
        }, 500)
        const timeout = setTimeout(async () => {
            const end = messageCollection.get('end' + userID + channelID)
            const stop = messageCollection.get('stop' + userID + channelID)
            clearInterval(interval)
            await end(stop)
        }, options.time)
    }
}

class InteractionCollector {
    stop(reason) {
        interactionCollection.set('stop' + this.userID + this.channelID, reason)
    }
    /**
     * 
     * @param {function(string)} callback 
     */
    onEnd(callback) {
        interactionCollection.set('end' + this.userID + this.channelID, callback)
    }
    /**
     * 
     * @param {function(ComponentInteraction | CommandInteraction)} callback
     */
    onCollect(callback) {
        interactionCollection.set('collect' + this.userID + this.channelID, callback)
    }
    /**
     * @param {{
     * message: Message | CommandInteraction,
     * filter: function(ComponentInteraction | CommandInteraction),
     * time: number
     * }} options 
     */
    constructor(options) {
        const { message } = options
        const userID = this.userID = message.author ? message.author.id : message.user.id
        const channelID = this.channelID = message.channel.id
        if (typeof options.filter === 'function') interactionCollection.set('filter' + userID + channelID, options.filter);
        const interval = setInterval(async () => {
            const end = interactionCollection.get('end' + userID + channelID)
            const stop = interactionCollection.get('stop' + userID + channelID)
            if (stop) {
                interactionCollection.delete('end' + userID + channelID)
                interactionCollection.delete('stop' + userID + channelID)
                interactionCollection.delete('collect' + userID + channelID)
                await end(stop)
                clearInterval(interval)
                clearTimeout(timeout)
            }
        }, 500)
        if(options.time) timeout = setTimeout(async () => {
            const end = interactionCollection.get('end' + userID + channelID)
            const stop = interactionCollection.get('stop' + userID + channelID)
            clearInterval(interval)
            await end(stop)
        }, options.time)
    }
}

module.exports = { MessageCollector, InteractionCollector }