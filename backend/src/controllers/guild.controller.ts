import discordClient from "../services/discord.service";
import prisma from "../services/prisma.service";

const getGuilds = async(req: any, res: any) => {
    try {
        const guilds = await prisma.guild.findMany({
            select: {
                id: true,
                guildId: true,
            }
        })

        res.status(200).json({success: true, message: "Successfully obtained guilds", data: guilds});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: true, message: 'Internal server error' });
    }
}

const getGuild = async(req: any, res: any) => {
    try {
        const guild = await prisma.guild.findUnique({
            where: {
                guildId: req.body.guildId
            }
        })

        if (!guild) return res.status(200).json({success: false, message: "Guild not found"});

        res.status(200).json({success: true, message: "Successfully obtained guild", data: guild});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: true, message: 'Internal server error' });
    }

}

const getGuildCategories = async(req: any, res: any) => {
    try {
        const guild = discordClient.guilds.cache.get(req.body.guildId);
        if (!guild) {
            return res.status(404).json({ success: false, message: 'Guild not found' });
        }
        const categories = guild.channels.cache.filter((channel: any) => channel.type == 4).map((category: any) => {
            console.log(category);
            return {
                id: category.id,
                name: category.name,
                position: category.position,
            }
        })

        res.status(200).json({ success: true, message: 'Successfully obtained guild categories', data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: true, message: 'Internal server error' });
    }
}

export {
    getGuilds,
    getGuild,
    getGuildCategories
}