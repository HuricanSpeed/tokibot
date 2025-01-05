import discordClient from "../services/discord.service";
import prisma from "../services/prisma.service";

const getDiscordUserOrCreate = async (discordData: any) => {
    try {
        const user = await prisma.user.upsert({
            where:{
                userId: discordData
            },
            update: {},
            create: {
                userId: discordData
            }
        });

        return user;
    } catch (error) {
        console.error(error);
    }
}

const checkIfGuildIsSetup = async (adminGuilds: Array<Object>) => {
    try {
        const checkedGroups = await Promise.all(adminGuilds.map(async (guild: any) => {
            const guildData = discordClient.guilds.cache.get(guild.id);

            if(!guildData) {
                return {
                    id: guild.id,
                    name: guild.name,
                    icon: guild.icon,
                    setup: false
                }
            } else {
                return {
                    id: guild.id,
                    name: guild.name,
                    icon: guild.icon,
                    setup: true
                }
            }
        }));

        return checkedGroups;
    } catch (error) {
        console.error(error);
    }
}

export {
    getDiscordUserOrCreate,
    checkIfGuildIsSetup
}