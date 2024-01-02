const { client } = require("../..");
const { applicationCommand } = require("../../../utils/structures");

module.exports = new applicationCommand({
    name: 'help',
    description: 'Send help menu.'
})