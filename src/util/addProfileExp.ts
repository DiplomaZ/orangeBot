import { Message } from 'discord.js';
import { loadProfile } from './';

export const addProfileExp = (message: Message): void => {
    if (message.author.bot) return; // stop execution if bot typed something
    loadProfile(message, user => {
        // we're here because a command wasn't entered + message from bot

        const [oldLevel] = user.level;

        // assign exp based on length of sentence - spaces
        const experience =
            message.content.replace(/\s/g, '').length +
            Math.floor(Math.random() * 50 + 1);
        user.updateExperience(experience).then(user => {
            const [newLevel] = user.level;

            if (newLevel > oldLevel) {
                message.channel.send(
                    `Congratulations on leveling up  to level ${newLevel}, ${message.guild.members.get(
                        user.discordID
                    )}`
                );
            }
        });
    });
};
