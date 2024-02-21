const { CommandInteraction, ComponentInteraction } = require("eris");
const { client, interactionCollection, slashCommandCallbackCollection } = require("..");
const { ComponentTypes, ChannelTypes } = require("../../utils/types");

client.on('interactionCreate',
    /**
     * 
     * @param {CommandInteraction | ComponentInteraction} interaction 
     */
    async (interaction) => {
        interaction.user = client.users.get(interaction.member.id)
        if (interaction.user.bot) return;
        const command = slashCommandCallbackCollection.get(interaction.data.name)
        if(command) {
            const args = interaction.data.options
            return await command.execute(interaction, args)
        }
        const collect = interactionCollection.get('collect' + interaction.user.id + interaction.channel.id)
        if(collect && interaction.channel.type === ChannelTypes['GuildText']) {
            const filter = interactionCollection.get('filter' + interaction.user.id + interaction.channel.id)
            if(typeof filter === 'function') {
                if(!filter(interaction)) return;
            }
            await collect(interaction)
        }
    })