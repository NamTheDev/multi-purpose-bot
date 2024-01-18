const EmbedStructure = require("../structures/EmbedStructure")

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
module.exports = Embed