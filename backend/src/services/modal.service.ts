import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, ModalSubmitInteraction, TextChannel } from "discord.js";
import prisma from "./prisma.service";

const handleModal = async (interaction: ModalSubmitInteraction) => {
    const { customId, guild, member } = interaction;

    if(customId.includes("closeticketwithreason") && member instanceof GuildMember){
        await interaction.deferUpdate();
        const reason = interaction.fields.getTextInputValue("reason");

        if(!reason) return;

        const ticketId = customId.split("-closeticket")[0];
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            },
            include: {
                panel: true
            }
        });

        if(!ticket) return;

        if(ticket.status === "CLOSED") {
            await interaction.reply({ content: "Ticket is already closed", ephemeral: true });
            return;
        }

        const channel = await guild?.channels.fetch(ticket.ticketChannel) as TextChannel;
        await channel.setParent(ticket.panel.closedCategoryId, { lockPermissions: false });
        await channel.permissionOverwrites.edit(ticket.createdBy as string, {
                ViewChannel: false
            }
        )
        await channel.setName(`closed-${channel.name.split("ticket-")[1]}`);
        const user = await guild?.members.fetch(ticket.createdBy) as GuildMember;
        await user.send(`Your ticket has been closed`);
        
        await prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: "CLOSED",
                closeReason: reason
            }
        });
        
        const buttons = [
            new ButtonBuilder()
            .setCustomId(`${ticketId}-reopen`)
            .setLabel('Reopen Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🔓'),
            new ButtonBuilder()
            .setCustomId(`${ticketId}-deleteticket`)
            .setLabel('Delete Ticket')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🗑️')
        ]
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);

        const embed = new EmbedBuilder()
        .setColor(0x006796)
        .setTitle('Ticket closed')
        .setDescription(`Ticket has been closed by ${member?.user.username}`);
        
        await channel.send({ embeds: [embed], components: [row] });
        // await interaction.deferReply();
    }
}

export default handleModal;