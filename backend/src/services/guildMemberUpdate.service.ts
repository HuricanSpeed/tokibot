import { EmbedBuilder, GuildMember, PartialGuildMember } from "discord.js";
import logAction from "./logger.service";

const guildMemberUpdateHandler = async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
    try {
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (addedRoles.size > 0) {
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle("Role Added")
                .setDescription(`${newMember} was given the role ${addedRoles.first()}`);

            logAction({
                guild: newMember.guild,
                embed: embed
            })
        }

        if (removedRoles.size > 0) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("Role Removed")
                .setDescription(`${newMember} was removed from the role ${removedRoles.first()}`);

            logAction({
                guild: newMember.guild,
                embed: embed
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export default guildMemberUpdateHandler;