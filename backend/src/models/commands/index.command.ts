import { SlashCommandBuilder } from "discord.js";

const commands = [
    new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a user from the server")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    new SlashCommandBuilder()
        .setName("setticketpanelchannel")
        .setDescription("Set the ticket panel channel")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The name of the ticket panel")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel to set as the ticket panel")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("category")
                .setDescription("The category to create tickets in")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("closedcategory")
                .setDescription("The category to move closed tickets to")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mutes a user")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to mute")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName("duration")
                .setDescription("The time to mute the user for (minutes)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the mute")
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song")
        .addStringOption(option =>
            option.setName("song")
                .setDescription("The song to play")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command"),
    new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),
    new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the current song"),

].map(command => command.toJSON());

export default commands;