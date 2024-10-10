/**
 * Handles the ping command interaction by replying with "Pong!".
 *
 * @param interaction - The interaction object representing the command interaction.
 * @returns A promise that resolves when the reply is sent.
 */
const ping = async (interaction: any) => {
    await interaction.reply({
        content: "Pong!",
        ephemeral: true
    });
}

export default ping