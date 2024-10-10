import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, GuildTextBasedChannel } from "discord.js"
import { distube } from "../../services/discord.service";

const playSong = async (interaction: CommandInteraction) => {
    const song = (interaction.options as CommandInteractionOptionResolver).getString("song");

    const member = interaction.guild?.members.cache.get(interaction.user.id);

    if (!song) {
        await interaction.reply({ content: "Please provide a song to play", ephemeral: true });
        return;
    }

    if(!member?.voice.channel) {
        await interaction.reply({ content: "You need to be in a voice channel to play music", ephemeral: true });
        return;
    }
    
    distube.play(member?.voice.channel, song, {
        textChannel: interaction.channel as GuildTextBasedChannel,
        member: interaction.member as GuildMember
    });
}

export default playSong;