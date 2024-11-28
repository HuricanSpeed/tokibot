import { createCanvas, loadImage } from "canvas";
import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import generateWelcomeImage from "../../services/imageGenerate.service";

/**
 * Handles the 'test' command interaction.
 * 
 * @param interaction - The command interaction object.
 * @returns A promise that resolves when the interaction reply is sent.
 */
const test = async (interaction: CommandInteraction) => {
    const input = (interaction.options as CommandInteractionOptionResolver).getString("input")!;

    const attachment = await generateWelcomeImage(interaction.user.displayName, interaction.user.displayAvatarURL({extension: 'png'}));

    if (!attachment) {
        throw new Error("Failed to generate welcome image.");
    }

    await interaction.reply({
        files: [attachment]
    });
}

export default test;