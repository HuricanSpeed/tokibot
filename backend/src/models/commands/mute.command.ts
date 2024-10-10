import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import discordClient from "../../services/discord.service";

const mute = async (interaction: CommandInteraction) => {
    const user = (interaction.options as CommandInteractionOptionResolver).getUser("user")!;
    const duration = (interaction.options as CommandInteractionOptionResolver).getNumber("duration")!;
    const reason = (interaction.options as CommandInteractionOptionResolver).getString("reason")! || "No reason provided";
    
    if(!user){
        await interaction.reply({content: "User not found", ephemeral: true});
        return;
    }

    const member = interaction.guild?.members.cache.get(user.id);

    const memberInteracting = interaction.guild?.members.cache.get(interaction.user.id);

    const discordClientUser = discordClient.guilds.cache.get(interaction.guildId!)?.members.cache.get(discordClient.user?.id!);

    if (member && member.roles.highest.position >= discordClientUser?.roles.highest.position!) {
        await interaction.reply('I cannot timeout this user because they have a higher or equal role to mine.');
        return;
    }

    if (user.id === interaction.user.id) {
        await interaction.reply({content: "You cannot timeout yourself", ephemeral: true});
        return
    }

    if(user.id === discordClient.user?.id) {
        await interaction.reply({content: "I cannot timeout myself", ephemeral: true});
        return;
    }

    if(memberInteracting && !memberInteracting.permissions.has("MuteMembers")) {
        await interaction.reply({content: "You do not have the required permissions to mute this user", ephemeral: true});
        return;
    }

    if (user.id === interaction.guild?.ownerId) {
        await interaction.reply({content: "I cannot timeout the owner of the server", ephemeral: true});
        return;
    }

    try {
        console.log(duration)
        await member?.timeout(duration * 60 * 1000, reason);
        await interaction.reply({content: `User ${user.tag} has been muted for ${duration} minutes`, ephemeral: true});
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
}

export default mute;