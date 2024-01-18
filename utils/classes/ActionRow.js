const ButtonStructure = require("../structures/ButtonStructure")
const SelectMenuStructure = require("../structures/SelectMenuStructure")
const { ComponentTypes } = require("../types")

class ActionRow {
    type = ComponentTypes['ActionRow']
    /**
     * @type {Array.<ButtonStructure>}
     */
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
module.exports = ActionRow