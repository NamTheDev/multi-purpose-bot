const { Message, CommandInteraction } = require("eris");
const { client } = require("../src")
const { EmbedStructure, fileStructure } = require("./structures")
/**
 * @param {Message | CommandInteraction} message 
 * @param {string | {content: string, embed: EmbedStructure, embeds: Array.<EmbedStructure>, components: Array.<import("eris").ActionRow>}} content 
 * @param {{message_reference: boolean}} options 
 * @param {fileStructure | Array.<fileStructure>} file
 */
async function reply(message, content, file, options) {
    if (!options) options = {};
    if (options.message_reference === true || [undefined, null].includes(options.message_reference)) {
        if (typeof content !== 'object') content = { content: content };
        content.messageReference = { message_id: message.id }
        if (message.createFollowup)
            return message.createFollowup(content, file)
        else if (message.createMessage)
            return message.createMessage(content, file)
        else return message.channel.createMessage(content, file)
    } else {
        return message.channel.createMessage(content, file)
    }
}

module.exports = { reply }