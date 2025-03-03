import { TextChannel } from "discord.js"
import discordClient from "./discord.service"
import cron from "node-cron"
import prisma from "./prisma.service"

const reactionChallenge = async (serverId: any, channelId: any, challenge: any) => {
    const server = await discordClient.guilds.fetch(serverId)
    const channel = await server.channels.fetch(channelId) as TextChannel

    if (!channel) {
        throw new Error(`Channel with ID ${channelId} not found`);
    }

    if (challenge === "reactions") {
        const emojis = ["👍", "👎", "🤷", "🔥", "⚡", "🎯", "💥"]
        const chosenEmoji = emojis[Math.floor(Math.random() * emojis.length)]
        const sendMessage = await channel.send(`First to react witch ${chosenEmoji} wins`)
        await sendMessage.react(chosenEmoji)

        const filter = (reaction: any, user: any) => {
            return reaction.emoji.name === chosenEmoji && !user.bot
        }

        const collector = sendMessage.createReactionCollector({ filter, max: 1, time: 10000 })

        collector.on("collect", (reaction, user) => {
            channel.send(`🏆 **${user.username} wins!**`)
        })

        collector.on("end", (collected, reason) => {
            if (reason === "time" || collected.size === 0) {
                channel.send("No one reacted in time! 😢");
            }
        })

        
    } else if (challenge === "maths") {
        const num = Math.floor(Math.random() * 100)
        const num2 = Math.floor(Math.random() * 100)
        const answer = num + num2

        channel.send(`🧮 Solve this: **${num} + ${num2} = ?**`)

        const filter = (message: any) => {
            return !message.author.bot && message.content === answer.toString()
        }

        const collector = channel.createMessageCollector({ filter, max: 1, time: 10000 })

        collector.on("collect", (message) => {
            channel.send(`🎉 **${message.author} got it right!**`)
        })

        collector.on("end", (collected, reason) => {
            if (reason === "time" || collected.size === 0) {
                channel.send(`⏳ Time's up! The correct answer was **${answer}**.`);
            }
        })

    } else if (challenge === "words") {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1")
        
        const word = (await response.json())[0]
        
        channel.send(`📝 Type the word: **${word}**`)

        const filter = (message: any) => {
            return !message.author.bot && message.content.toLowerCase() === word.toLowerCase()
        }

        const collector = channel.createMessageCollector({ filter, max: 1, time: 10000 })

        collector.on("collect", (message) => {
            channel.send(`🎉 **${message.author} got it right!**`)
        })

        collector.on("end", (collected, reason) => {
            if (reason === "time" || collected.size === 0) {
                channel.send(`⏳ Time's up! The correct answer was **${word}**.`);
            }
        })
    } else if (challenge === "scramble") {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1")

        const word = (await response.json())[0]

        const scrambled = word.split("").sort(() => Math.random() - 0.5).join("")

        channel.send(`🔀 Unscramble this word: **${scrambled}**`)

        const filter = (message: any) => {
            return !message.author.bot && message.content.toLowerCase() === word.toLowerCase()
        }

        const collector = channel.createMessageCollector({ filter, max: 1, time: 10000 })

        collector.on("collect", (message) => {
            channel.send(`🎉 **${message.author} got it right!**`)
        })

        collector.on("end", (collected, reason) => {
            if (reason === "time" || collected.size === 0) {
                channel.send(`⏳ Time's up! The correct answer was **${word}**.`);
            }
        })
    }
    
}

cron.schedule("* * * * *", async () => {
    const challenges = await prisma.challenges.findMany(
        {
            select: {
                id: true,
                guildId: true,
                channelId: true,
                challenge: true,
                playEach: true,
                nextTime: true,
            }
        }
    )

    for (const challenge of challenges) {
        if (challenge.nextTime <= new Date() || challenge.nextTime === null) {
            await reactionChallenge(challenge.guildId, challenge.channelId, challenge.challenge)
            await prisma.challenges.update({
                where: {
                    id: challenge.id
                },
                data: {
                    nextTime: new Date(new Date().getTime() + challenge.playEach * 60000)
                }
            })
        }
    }
})