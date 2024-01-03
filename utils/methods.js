const { Message, CommandInteraction } = require("eris");
const { client } = require("../src")
const { EmbedStructure, fileStructure } = require("./structures")
/**
 * @param {Message | CommandInteraction} message 
 * @param {string | {content: string, embed: EmbedStructure, embeds: Array.<EmbedStructure>, components: Array.<import("eris").ActionRow>}} content 
 * @param {boolean} message_reference 
 * @param {fileStructure | Array.<fileStructure>} file
 */
async function reply(message, content, message_reference, file) {
    if (message_reference === false && ![null, undefined].includes(message_reference)) {
        return message.channel.createMessage(content, file)
    }
    if(typeof content !== 'object') {
        content = {content: content}
    }
    content.messageReference = { message_id: message.id }
    return message.channel.createMessage(content, file)
}

module.exports = { reply }