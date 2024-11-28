import { Guild } from "discord.js";
import ModuleSettings from "../models/interfaces/moduleSettings.model";
import prisma from "./prisma.service"

interface logActionData {
    guild: any;
    embed: any;
}

const logAction = async (data: logActionData) => {
    const moduleSettings = await prisma.settings.findUnique({
        where: {
            guildId: data.guildId
        }
    })

    if(!moduleSettings) return;

    const modules = moduleSettings.modules as ModuleSettings;

    if(modules.modLog) {
        const logChannel = data.guild.channels.cache.get(modules.modLog.channelId as string);
        if(!logChannel) return;
        logChannel.send({
            embeds: [data.embed]
        })
    }
}

export default logAction;