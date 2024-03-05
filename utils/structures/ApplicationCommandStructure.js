const ApplicationCommandTypes = require("../types/ApplicationCommandTypes");
const ApplicationCommandOptionStructure = require("./ApplicationCommandOptionStructure");

/**
 * @enum {{ 
* type: number | ApplicationCommandTypes
* guild_id?: string,
* name: string,
* name_localizations?: string,
* description: string,
* description_localizations?: string,
* options?: Array.<ApplicationCommandOptionStructure>,
* default_member_permissions: ?string,
* dm_permission: boolean,
* nsfw: boolean,
* execute: function(import("eris").CommandInteraction, string[]): void
* }} 
*/
let ApplicationCommandStructure;
module.exports = ApplicationCommandStructure