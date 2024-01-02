/**
 * @enum {'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link'}
 */
let ButtonStyles = { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 };

/**
 * @enum {{ id: string, name: string }}
 */
let EmojiStructure;

/**
 * @enum {{name: string, buffer: Buffer}}
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
 * nsfw: boolean,
 * execute: function(import("eris").CommandInteraction, string[])
 * }} 
 */
let applicationCommandStructure;

/**
 * @enum {{
 * style: ButtonStyles,
 * label: string,
 * emoji?: EmojiStructure,
 * custom_id: string,
 * url?: string,
 * disabled?: boolean,
 * }}
 */
let ButtonStructure;

/**
 * @enum {{
 * label: string,
 * value: string,
 * description?: string,
 * emoji?: EmojiStructure,
 * default?: boolean
 * }}
 */
let SelectOptionStructure;

/**
 * @enum {{
 * id: string,
 * type: 'user' | 'role' | 'channel'
 * }}
 */
let SelectDefaultValueStructure;

/**
 * @enum {{
 * type: number,
 * custom_id: string,
 * options: Array.<SelectOptionStructure>,
 * channel_types?: Array.<ChannelTypes>,
 * placeholder?: string,
 * default_values?: Array.<SelectDefaultValueStructure>,
 * min_values?: number,
 * max_values?: number,
 * disabled?: boolean
 * }}
 */
let SelectMenuStructure;

class Button {
    type = ComponentTypes['Button']
    /**
     * @param {ButtonStructure} json
     * @returns {object}
     */
    constructor(json) {
        json.style = ButtonStyles[json.style] || json.style
        json.type = this.type
        return json
    }
}

class Emoji {
    /**
     * @param {string | EmojiStructure} emoji 
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
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setTitle(string) {
        this.title = string
        return this
    }
    /**
     * 
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setURL(string) {
        this.title = string
        return this
    }
    /**
     * 
     * @param {{name: string, icon_url: string, url: string}} object 
     * @returns {EmbedStructure}
     */
    setAuthor(object) {
        this.author = object
        return this
    }
    /**
     * 
     * @param {number} number 
     * @returns {EmbedStructure}
     */
    setColor(number) {
        this.color = number
        return this
    }
    /**
     * 
     * @param {string} string 
     * @returns {EmbedStructure}
     */
    setDescription(string) {
        this.description = string
        return this
    }
    /**
     * 
     * @param {{url: string}} object 
     * @returns {EmbedStructure}
     */
    setThumbnail(object) {
        this.thumbnail = object
        return this
    }
    /**
     * 
     * @param {Array.<{name: string, value: string}>} object 
     * @returns {EmbedStructure}
     */
    setFields(object) {
        this.fields = object
        return this
    }
    /**
     * 
     * @param {{name: string, value: string}} object 
     * @returns 
     */
    addField(object) {
        if (typeof this.fields === 'object' && !isNaN(this.fields.length)) this.fields.push(object)
        return this
    }
    /**
     * 
     * @param {{url: string}} object 
     * @returns {EmbedStructure}
     */
    setImage(object) {
        this.image = object
        return this
    }
    /**
     * 
     * @param {Date} date 
     * @returns {EmbedStructure}
     */
    setTimestamp(date) {
        this.timestamp = date
        return this
    }
    /**
     * 
     * @param {{text: string, icon_url: string}} object 
     * @returns {EmbedStructure}
     */
    setFooter(object) {
        this.footer = object
        return this
    }
    /**
     * 
     * @param {EmbedStructure} json 
     */
    constructor(json) {
        if (typeof json === 'object') {
            for (const entry of Object.entries(json)) {
                this[entry[0]] = entry[1]
            }
        }
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

class ActionRow {
    type = ComponentTypes['ActionRow']
    components = []
    /**
     * 
     * @param {ButtonStructure | SelectMenuStructure} component 
     * @returns 
     */
    addComponent(component) {
        this.components.push(component)
        return this
    }
    /**
     * 
     * @param  {Array.<ButtonStructure> | Array.<SelectMenuStructure>} components 
     */
    constructor(...components) {
        for (const component of components) {
            this.components.push(component)
        }
    }
}
module.exports = {
    Emoji,
    Embed,
    Button,
    Text,
    applicationCommand,
    ActionRow,
    SelectDefaultValueStructure,
    SelectMenuStructure,
    SelectOptionStructure,
    EmojiStructure,
    applicationCommandOptionTypes,
    applicationCommandTypes,
    applicationCommandStructure,
    ComponentTypes,
    ChannelTypes,
    ButtonStyles,
    EmbedStructure,
    fileStructure
}