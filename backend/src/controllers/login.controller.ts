import dotenv from 'dotenv';
dotenv.config();

import axios from "axios";
import { getDiscordUserOrCreate } from '../utils/discord';

const login = async (req: any, res: any) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ success: false, error: "No code provided" });
    }

    const params = new URLSearchParams();
    params.append("client_id", process.env.CLIENT_ID as string);
    params.append("client_secret", process.env.CLIENT_SECRET as string);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.DISCORD_REDIRECT_URI as string);

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', params)
        const { access_token, token_type } = response.data;
        const userDataResponse = await axios.get('https://discord.com/api/users/@me',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })

        const guildDataResponse = await axios.get('https://discord.com/api/users/@me/guilds',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })

        const adminGuilds = await guildDataResponse.data.filter((guild: any) => {
            const permissions = BigInt(guild.permissions); // Convert permissions to BigInt for bitwise operations
            return (permissions & BigInt(0x00000008)) === BigInt(0x00000008); // Check if the ADMINISTRATOR bit is set
        });

        // const user = await getDiscordUserOrCreate(userDataResponse.data.id)
        req.session.logged = true,
        req.session.accountData = userDataResponse.data
        req.session.adminGuilds = adminGuilds; // Change this line

        // req.session.accountData.accountId = user?.id
        
        res.status(301).redirect(process.env.DOMAIN as string); 
    } catch (error: any) {
        console.error(error);

        if(error.response.status == 400 && error.response.data.error_description == 'Invalid "code" in request.') {
            return res.status(400).json({ success: false, error: "Invalid code" });
        }
    }
}


const logout = async (req: any, res: any) => {
    try {
        req.session.logged = false;
        req.session.accountData = null;
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export {
    login,
    logout
}