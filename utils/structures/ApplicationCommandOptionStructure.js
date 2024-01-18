const ApplicationCommandOptionTypes = require("../types/ApplicationCommandOptionTypes");
const ChannelTypes = require("../types/ChannelTypes");

/**
 * @enum {{
* type: number | ApplicationCommandOptionTypes,
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
module.exports = ApplicationCommandOptionStructure