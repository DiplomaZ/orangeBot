import { Message } from 'discord.js';
import User, { UserConfig } from '../db/models/user';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, arg): void {
        loadProfile(message, user => {
            const [level, experience, expToNextLevel] = user.level;
            // ! refactor by moving function into helper folder or make a user method
            const createProgressBar = (
                experience,
                expToNextLevel,
                chunks = 30
            ): string => {
                const progressPercentage = experience / expToNextLevel;
                const progressInChunks = Math.round(
                    progressPercentage * chunks
                );
                const filledBar = '■';
                const unfilledBar = '□';
                const progressBar = filledBar
                    .repeat(progressInChunks)
                    .replace(/\s/g, '')
                    .concat(unfilledBar.repeat(chunks - progressInChunks));
                return progressBar;
            };
            message.channel.send(
                `Hello, ${username}, how are you today? Your account balance is ${user.balance}.`
            );
        });
    },
};
