import { Client, GatewayIntentBits, Guild, GuildMember, PartialGuildMember, REST, Routes, VoiceState } from "discord.js";
import { DisTube, DisTubeEvents } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from '@distube/yt-dlp'; // Optional: For better YouTube support
import commands from "../models/commands/index.command";

import ping from "../models/commands/ping.command";
import test from "../models/commands/test.command";
import ban from "../models/commands/ban.command";
import setTicketPanelChannel from "../models/commands/setTicketPanelChannel.comand";
import handleButtonClick from "./button.service";
import handleModal from "./modal.service";
import mute from "../models/commands/mute.command";
import playSong from "../models/commands/play.command";
import handleMemberAdd from "./memberAdd.service";
import guildMemberUpdateHandler from "./guildMemberUpdate.service";


const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent // Required if your bot needs to read message content
    ]
});

const distube = new DisTube(discordClient, {
    plugins: [
        new SpotifyPlugin({
            api: {
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET
            }
        }),
        new YtDlpPlugin()
    ]
})

distube
    .on("playSong" as keyof DisTubeEvents, (queue: any, song: any) => {
        queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\``);
    })
    .on("addSong" as keyof DisTubeEvents, (queue: any, song: any) => {
        queue.textChannel.send(`Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`);
    })
    .on("playList" as keyof DisTubeEvents, (queue: any, playlist: any) => {
        queue.textChannel.send(
            `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${playlist.user}`
        );
    })

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);


discordClient.once("ready", async () => {
    console.log(`Logged in as ${discordClient.user?.tag}`);
    
    try {
    
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);        
    }
});

discordClient.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        if (commandName === "ping") {
            console.log("ping command");
            await ping(interaction);
        } else if (commandName === "ban") {
            await ban(interaction);
        } else if (commandName === "setticketpanelchannel") {
            await setTicketPanelChannel(interaction);
        } else if (commandName === "mute") {
            await mute(interaction);
        } else if (commandName === "play") {
            await test(interaction);
        } else if (commandName === "test") {
            await test(interaction);
        } else {
            await interaction.reply({ content: "Unknown command", ephemeral: true });
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
        
    }
});

discordClient.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    // const { customId, member, guild } = interaction;

    handleButtonClick(interaction);
})

discordClient.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    handleModal(interaction);
});

discordClient.on("guildMemberUpdate", async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
    if(!oldMember || !newMember) return;

    guildMemberUpdateHandler(oldMember, newMember);
})

discordClient.on("voiceStateUpdate", async (oldState: VoiceState, newState: VoiceState) => {
    if(!oldState || !newState) return;

    if(!oldState.channel && newState.channel) {
        console.log("User joined a voice channel");
    }
})


discordClient.on("guildMemberAdd", async member => {
    if(!member) return;

    handleMemberAdd(member);
})

export default discordClient;

export { distube };