const SelectMenuStructure = require("../structures/SelectMenuStructure")
const { SelectMenuTypes } = require("../types")

class SelectMenu {
    /**
     * @param {SelectMenuStructure} json
     * @returns
     */
    constructor(json) {
        json.type = SelectMenuTypes[json.type]
        return json
    }

}
module.exports = SelectMenu