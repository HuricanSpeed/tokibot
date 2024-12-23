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

export {
    getGuilds,
    getGuild
}