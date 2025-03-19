import prisma from "../services/prisma.service";

const getFunServices = async (req: any, res: any) => {
    try {
        const challenges = prisma.guild.findMany({
            where: {
                id: req.body.id
            },
            select: {
                settings: {
                    select: {
                        challenge: true,
                    }
                }
            }
        })

        res.status(200).json({ success: true, message: "Successfully fetched fun services", data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { getFunServices };