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

export {
    getDiscordUserOrCreate
}