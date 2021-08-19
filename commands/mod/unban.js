const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "Unban user from this server",
    options: [
        {
            name: "user",
            description: "user to unban",
            type: 3,
            required: true
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            await interaction.guild.commands.permissions.add({ command: interaction.commandId, permissions: [
                {
                    id: interaction.user.id,
                    type: "USER",
                    permission: false
                }
            ] })
            return interaction.reply({ content: "You dont have permission to do this command!", ephemeral: true })
        }
        const user = interaction.options.getString('user');
        try {
            await interaction.guild.bans.remove(user);
            const unbanUser = await client.users.fetch(user)
            interaction.reply({ content: `✅ **@${unbanUser.username} has been unbanned**` })
        } catch (e) {
            console.error(e)
            return interaction.reply({ content: `Error: ${e}` })
        } 
    }
}