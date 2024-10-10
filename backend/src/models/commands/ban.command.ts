import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";

const ban = async (interaction: CommandInteraction) => {
    const user = (interaction.options as CommandInteractionOptionResolver).getUser("user")!;
    const reason = (interaction.options as CommandInteractionOptionResolver).getString("reason")!;
    if(user) {
        const member: any = interaction.guild?.members.cache.get(user.id);
        if(member) {
            if(member.bannable) {
                await user.send(`\`\`\`You've been banned from: ${interaction.guild?.name}\nReason: ${reason}\`\`\``);
                await interaction.reply({
                    content: `Banned ${user.tag} for "${reason}"`,
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "I cannot ban this user!",
                    ephemeral: true
                });
            }
        } else {
            await interaction.reply({
                content: "User not found!",
                ephemeral: true
            });
        }
    } else {
        await interaction.reply({
            content: "User not found!",
            ephemeral: true
        });
    }
}

export default ban;