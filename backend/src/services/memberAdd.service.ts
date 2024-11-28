import { GuildMember, TextChannel } from "discord.js";
import prisma from "./prisma.service";
import generateWelcomeImage from "./imageGenerate.service";
import ModuleSettings from "../models/interfaces/moduleSettings.model";


const handleMemberAdd = async (member: GuildMember) => {
    const moduleSettings = await prisma.settings.findUnique({
        where: {
            guildId: member.guild.id
        }
    })

    if(!moduleSettings) return;

    const modules = moduleSettings.modules as ModuleSettings;
    if(modules.welcomer) {
        const welcomeChannel = member.guild.channels.cache.get(modules.welcomer.channelId as string) as TextChannel;
        if(!welcomeChannel) return;
        generateWelcomeImage(member.user.username, member.user.displayAvatarURL()).then(async (attachment) => {
            if (attachment) {
                welcomeChannel.send({
                    files: [attachment]
                });
            }
        })
    }

    if(modules.autoRole) {
        modules.autoRole.roleId.map((roleId) => {
            const role = member.guild.roles.cache.get(roleId as string);
            if (!role) return;
            member.roles.add(role);
        })
    }
}

export default handleMemberAdd; 