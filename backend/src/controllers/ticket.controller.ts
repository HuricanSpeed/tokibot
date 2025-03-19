import cuid from "cuid";
import prisma from "../services/prisma.service";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder } from "discord.js";
import discordClient from "../services/discord.service";

const createPanel = async (req: any, res: any) => {
    try {
        const panelId = cuid()

        // Save the channel ID to the database
        const panel = await prisma.guild.upsert({
            where:{
                guildId: req.body.guildId
            },
            update: {
                settings: {
                    update:{
                        ticketPanel:{
                            create: {
                                id: panelId,
                                channelId: req.body.panel.sendChannel,
                                name: req.body.panel.name,
                                categoryId: req.body.panel.openCategory,
                                closedCategoryId: req.body.panel.closeCategory,
                            }
                        }
                    }
                }
            },
            create: {
                guildId: req.body.guildId!,
                settings: {
                    create: {
                        ticketPanel: {
                            create: {
                                id: panelId,
                                channelId: req.body.panel.sendChannel,
                                name: req.body.panel.name,
                                categoryId: req.body.panel.openCategory,
                                closedCategoryId: req.body.panel.closeCategory,
                            }
                        }
                    }
                }
            }
        });

        const openTicketButton = new ButtonBuilder()
            .setCustomId(`${panelId}-openticket`)
            .setLabel('Make Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🎫')
        
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(openTicketButton);
        const embed = new EmbedBuilder()
            .setColor(0x006796)
            .setTitle('Make a ticket')
            .setDescription(`Click the button below to open a ticket`)
            .setTimestamp()
            .setFooter({ text: 'Tokibot.eu', iconURL: discordClient.user?.displayAvatarURL()! });

        
        const sendChannel = discordClient.channels.cache.get(req.body.panel.sendChannel);

        if(sendChannel?.type !== ChannelType.GuildText) return

        const message = await sendChannel.send({
            embeds: [embed],  // Optional message content
            components: [row],  // Attach the button row
        });

        await prisma.ticketPanel.update({
            where: {
                id: panelId
            },
            data: {
                messageId: message.id
            }
        })
        res.status(200).json({ success: true, message: 'Panel created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getPanels = async (req: any, res: any) => {
    try {
        const panels = await prisma.ticketPanel.findMany({
            where: {
                setting: {
                    guildId: req.body.guildId
                }
            },
            select: {
                id: true,
                name: true,
                channelId: true,
                categoryId: true,
                closedCategoryId: true,
                _count: {
                    select: {
                        Ticket: true
                    }
                }
            }
        });

        res.status(200).json({ success: true, data: panels });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

const getPanel = async (req: any, res: any) => {
    try {
        const panel = await prisma.ticketPanel.findUnique({
            where: {
                id: req.body.panelId
            }
        });

        res.status(200).json({ success: true, data: panel });   
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
}

const updatePanel = async (req: any, res: any) => {
    try {
        await prisma.ticketPanel.update({
            where: {
                id: req.body.panel.id
            },
            data: {
                name: req.body.panel.name,
                channelId: req.body.panel.sendChannel,
                categoryId: req.body.panel.openCategory,
                closedCategoryId: req.body.panel.closeCategory
            }
        });

        res.status(200).json({ success: true, message: 'Panel updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deletePanel = async (req: any, res: any) => {
    try {
        await prisma.ticketPanel.delete({
            where: {
                id: req.body.panelId
            }
        });

        res.status(200).json({ success: true, message: 'Panel deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export {
    createPanel,
    getPanels,
    getPanel,
    updatePanel,
    deletePanel
}