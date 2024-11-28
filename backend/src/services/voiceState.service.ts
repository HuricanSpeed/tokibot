import { VoiceState } from "discord.js";
import logAction from "./logger.service";
import { EmbedBuilder } from "@discordjs/builders";

const voiceStateUpdateHandler = async (oldState: VoiceState, newState: VoiceState) => {
    try {
        const newChannel = newState.channel
        const oldChannel = oldState.channel

        if(newChannel !== oldChannel) {
            if(!oldChannel && newChannel){
                logAction({
                    guild: newState.guild,
                    embed: new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle("Joined to channel")
                        .setDescription(`${newState.member?.displayName} joined voice channel: ${newChannel.name}`)
                })
            } else if(oldChannel && !newChannel) {
                logAction({
                    guild: oldState.guild,
                    embed: new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle("Left channel")
                        .setDescription(`${newState.member?.displayName} left voice channel: ${oldChannel.name}`)
                });
            } else if(oldChannel && newChannel) {
                logAction({
                    guild: oldState.guild,
                    embed: new EmbedBuilder()
                        .setColor(0xFFFF00)
                        .setTitle("Switched channel")
                        .setDescription(`${newState.member?.displayName} switched voice channel from ${oldChannel.name} to ${newChannel.name}`)
                });
            }
        }
    } catch (error) {
        console.error(error)
    } 
}

export default voiceStateUpdateHandler;