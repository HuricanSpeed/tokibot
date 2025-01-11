import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, GuildChannel, GuildMember, ModalActionRowComponentBuilder, ModalBuilder, PermissionFlagsBits, PermissionsBitField, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import prisma from "./prisma.service";
import cuid from "cuid";

const handleButtonClick = async (interaction: ButtonInteraction) => {
    const { customId, member, guild } = interaction;

    const interactionType = customId.split("-")[1];

    if(interactionType == "openticket" && member instanceof GuildMember) {
        const panelId = customId.split("-openticket")[0];

        const panel = await prisma.ticketPanel.findUnique({
            where: {
                id: panelId
            },
            include: {
                setting: {
                    include: {
                        guild: true
                    }
                }
            }
        }); 

        if(!panel) return;
        const channel = await guild?.channels.create({
            name: `ticket-${member.user.username}`,
            type: 0,
            parent: String(panel.categoryId),
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
                },
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        })

        
        if (channel instanceof TextChannel) {
            const ticketId = cuid()
            await prisma.ticket.create({
                data: {
                    id: ticketId,
                    panelId: panel.id,
                    ticketChannel: channel.id,
                    createdBy: member.id,
                }
            })
            const buttons = [
                new ButtonBuilder()
                    .setCustomId(`${ticketId}-closeticket`)
                    .setLabel('Close Ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒'),
                new ButtonBuilder()
                    .setCustomId(`${ticketId}-closeticketwithreason`)
                    .setLabel('Close Ticket With Reason')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒'),
                new ButtonBuilder()
                    .setCustomId(`${ticketId}-claim`)
                    .setLabel('Claim Ticket')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('🔒')
            ]
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);

            const embed = new EmbedBuilder()
                .setColor(0x006796)
                .setTitle('Ticket created')
                .setDescription(`Hello ${member.user.displayName}, support will be with you shortly!`);
            await channel.send({ content: `${member.user}`, embeds: [embed], components: [row] });
        }

        await interaction.reply({ content: `Your ticket has been created: ${channel}`, ephemeral: true });

    } else if(interactionType == "closeticket") {

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

        const channel = await interaction.channel as TextChannel;
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
                status: "CLOSED"
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
        await interaction.deferUpdate();
    } else if(interactionType == "reopen") {
        const ticketId = customId.split("-reopen")[0];
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            },
            include: {
                panel: true
            }
        });

        if(!ticket) return;

        if(ticket.status === "OPEN") {
            await interaction.reply({ content: "Ticket is already open", ephemeral: true });
            return;
        }

        const channel = await interaction.channel as TextChannel;
        await channel.setParent(ticket.panel.categoryId, { lockPermissions: false });
        await channel.permissionOverwrites.edit(ticket.createdBy as string, {
                ViewChannel: true
            }
        )
        await prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: "OPEN"
            }
        });
        await channel.setName(`ticket-${channel.name.split("closed-")[1]}`);

        const embed = new EmbedBuilder()
            .setColor(0x006796)
            .setTitle('Ticket reopened')
            .setDescription(`Ticket has been reopened`);
        
        await interaction.message.edit({ embeds: [embed], components: [] });
        await interaction.deferUpdate();
    } else if(interactionType == "closeticketwithreason") {
        const ticketId = customId.split("-closeticketwithreason")[0];
        const modal = new ModalBuilder()
            .setCustomId(`${ticketId}-closeticketwithreason`)
            .setTitle('Close Ticket With Reason')

        const reason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Reason')
            .setPlaceholder('Resolved, Fast Response')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const row = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(reason)

        modal.addComponents(row)

        await interaction.showModal(modal)
    } else if(interactionType == "deleteticket") {
        const ticketId = customId.split("-deleteticket")[0];
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            },
            include: {
                panel: true
            }
        });

        if(!ticket) return;

        const channel = await interaction.channel as TextChannel;
        await channel.delete();
        await prisma.ticket.delete({
            where: {
                id: ticketId
            }
        });

        await interaction.deferUpdate();
    } else {
        await interaction.reply({ content: "This button is not configured correctly", ephemeral: true });   
    }
}

export default handleButtonClick;