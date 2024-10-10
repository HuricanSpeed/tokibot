import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";

/**
 * Handles the 'test' command interaction.
 * 
 * @param interaction - The command interaction object.
 * @returns A promise that resolves when the interaction reply is sent.
 */
const test = async (interaction: any) => {
    const input = (interaction.options as CommandInteractionOptionResolver).getString("input")!;
    await interaction.reply({
        content: `Boop! You said: ${input}`,
        ephemeral: true
    });
}

export default test;