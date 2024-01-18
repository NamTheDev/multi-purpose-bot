const ButtonStructure = require("../structures/ButtonStructure")

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
module.exports = Button