import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder } from "discord.js";
import prisma from "../../services/prisma.service";
import cuid from "cuid";
import discordClient from "../../services/discord.service";



const setTicketPanelChannel = async (interaction: CommandInteraction) => {
    const name = (interaction.options as CommandInteractionOptionResolver).getString("name")!;
    const channel = (interaction.options as CommandInteractionOptionResolver).getChannel("channel")!;
    const category = (interaction.options as CommandInteractionOptionResolver).getChannel("category")!;
    const closedcategory = (interaction.options as CommandInteractionOptionResolver).getChannel("closedcategory")

    if(channel?.type !== ChannelType.GuildText){
        interaction.reply({
            content: `Ticket Panel Channel \`channel\` isn't a text channel. Please enter a valid text channel`,
            ephemeral: true
        })
        return
    }

    if(category?.type !== ChannelType.GuildCategory){
        interaction.reply({
            content: `Ticket Category \`category\` isn't a category. Please enter a valid category`,
            ephemeral: true
        })
        return
    }

    if(closedcategory?.type !== ChannelType.GuildCategory){
        interaction.reply({
            content: `Ticket Category \`category\` isn't a category. Please enter a valid category`,
            ephemeral: true
        })
        return
    }

    if(!channel || !category || !closedcategory || !name) return

    await interaction.reply({
        content: `Ticket panel channel set to: ${channel}`,
        ephemeral: true
    });

    const panelId = cuid()

    // Save the channel ID to the database
    const categoryId = category.id
    const panel = await prisma.guild.upsert({
        where:{
            guildId: interaction.guildId!
        },
        update: {
            settings: {
                update:{
                    ticketPanel:{
                        create: {
                            id: panelId,
                            channelId: channel.id,
                            name: name,
                            categoryId: categoryId,
                            closedCategoryId: closedcategory.id,
                        }
                    }
                }
            }
        },
        create: {
            guildId: interaction.guildId!,
            settings: {
                create: {
                    ticketPanel: {
                        create: {
                            id: panelId,
                            channelId: channel.id,
                            name: name,
                            categoryId: category.id,
                            closedCategoryId: closedcategory.id,
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

    
    const sendChannel = discordClient.channels.cache.get(channel.id);

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
}

export default setTicketPanelChannel;