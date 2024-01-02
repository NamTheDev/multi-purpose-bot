/**
 * @enum {'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link'}
 */
let ButtonStyles = { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 };

/**
 * @enum {name: string, buffer: Buffer}
 */
let fileStructure;

/**
 * @enum {{
* color: number, 
* title: string, 
* url: string, 
* author: { name: string, icon_url: string, url: string }, 
* description: string, 
* thumbnail: { url: string }, 
* fields: Array.<{name: string, value: string, inline: boolean}>, 
* image: { url: string }, 
* timestamp: Date, 
* footer: { text: string, icon_url: string }
* }}
*/
let EmbedStructure;

/**
 * @enum {'ChatInput' | 'User' | 'Message'}
 */
let applicationCommandTypes = { ChatInput: 1, User: 2, Message: 3 };

/**
 * @enum {'ActionRow' | 'Button' | 'StringSelect' | 'TextInput' | 'UserSelect' | 'RoleSelect' | 'MentionableSelect' | 'ChannelSelect'}
 */
let ComponentTypes = {
    ActionRow: 1,
    Button: 2,
    StringSelect: 3,
    TextInput: 4,
    UserSelect: 5,
    RoleSelect: 6,
    MentionableSelect: 7,
    ChannelSelect: 8
}

/**
 * @enum {'SubCommand' | 'SubCommandGroup' | 'String' | 'Interger' | 'Boolean' | 'User' | 'Channel' | 'Role' | 'Mentionable' | 'Number' | 'Attachment'}
 */
let applicationCommandOptionTypes = {
    SubCommand: 1,
    SubCommandGroup: 2,
    String: 3,
    Interger: 4,
    Boolean: 5,
    User: 6,
    Channel: 7,
    Role: 8,
    Mentionable: 9,
    Number: 10,
    Attachment: 11
}

/**
 * @enum {'GuildText' | 'DM' | 'GuildVoice' | 'GroupDM' | 'GuildCategory' | 'GuildAnnouncement' | 'AnnouncementThread' | 'PublicThread' | 'PrivateThread' | 'GuildStageVoice' | 'GuildDirectory' | 'GuildForum' | 'GuildMedia'}
 */
let ChannelTypes = {
    GuildText: 0,
    DM: 1,
    GuildVoice: 2,
    GroupDM: 3,
    GuildCategory: 4,
    GuildAnnouncement: 5,
    AnnouncementThread: 6,
    PublicThread: 7,
    PrivateThread: 8,
    GuildStageVoice: 9,
    GuildDirectory: 10,
    GuildForum: 11,
    GuildMedia: 12
}

/**
 * @enum {{
 * type: number | applicationCommandOptionTypes,
 * name: string,
 * name_localizations?: string,
 * description: string,
 * description_localizations?: string,
 * required?: boolean,
 * choices?: Array.<{name: string, name_localizations: string, value: string | number}>,
 * options?: Array.<ApplicationCommandOptionStructure>,
 * channel_types?: Array.<ChannelTypes>,
 * min_value?: number,
 * max_value?: number,
 * min_length?: number,
 * max_length?: number,
 * autocomplete?: boolean
 * }}
 */
let ApplicationCommandOptionStructure;

/**
 * @enum {{ 
 * type: number | applicationCommandTypes
 * guild_id?: string,
 * name: string,
 * name_localizations?: string,
 * description: string,
 * description_localizations?: string,
 * options?: Array.<ApplicationCommandOptionStructure>,
 * default_member_permissions: ?string,
 * dm_permission: boolean,
 * nsfw: boolean
 * }} 
 */
let applicationCommandStructure;

/**
 * @enum {{
 * style: ButtonStyles,
 * label: string,
 * emoji: string,
 * custom_id: string,
 * url: string,
 * disabled: boolean,
 * execute: function(import("eris").CommandInteraction, string[])
 * }}
 */
let ButtonStructure;

class Button {
    type = ComponentTypes['Button']
    /**
     * @param {ButtonStructure} json
     * @returns {object}
     */
    constructor(json) {
        json.style = ButtonStyles[json.style]
        json.type = this.type
        return json
    }
}

class Emoji {
    /**
     * @param {string | {
     * id: string,
     * name: string
     * }} emoji 
     * @returns {object} 
     */
    constructor(emoji) {
        if (typeof emoji === 'object') {
            if (!emoji.id) emoji.id = null;
            return emoji;
        } else return { id: null, name: emoji };
    }
}

class Embed {
    /**
     * 
     * @param {EmbedStructure} json 
     * @returns {object}
     */
    constructor(json) {
        return json
    }
}

class Text {
    /**
     * 
     * @returns {string}
     */
    capitalize() {
        if (typeof this.word === 'object') {
            const newArray = []
            for (let word of this.word) {
                word = word.split('')
                word[0] = word[0].toUpperCase()
                word = word.join('')
                newArray.push(word)
            }
            return newArray.join(' ')
        }
        this.word = this.word.split('')
        this.word[0] = this.word[0].toUpperCase()
        return this.word.join('')
    }
    /**
     * 
     * @param {string} word 
     */
    constructor(word) {
        this.word = word
    }
}

class applicationCommand {
    /**
     * 
     * @param {applicationCommandStructure} json 
     * @returns 
     */
    constructor(json) {
        json.options = json.options.map(option => {
            option.type = applicationCommandOptionTypes[option.type] || option.type
            option.channel_types = option.channel_types.map(type => ChannelTypes[type])
            return option
        })
        json.type = applicationCommandTypes[json.type] || json.type
        return json
    }
}

module.exports = {
    Emoji,
    Embed,
    Button,
    Text,
    applicationCommand,
    applicationCommandOptionTypes,
    applicationCommandTypes,
    applicationCommandStructure,
    ComponentTypes,
    ChannelTypes,
    ButtonStyles,
    EmbedStructure,
    fileStructure
}