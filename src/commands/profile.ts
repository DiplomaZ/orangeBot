import { Message } from 'discord.js';
import { loadProfile } from '../util/';
import ProgressBar from '../db/models/progressBar';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, [profile]: string[]): void {
        const { username } = message.author;
        loadProfile(message, user => {
            const { currentLevel, ...rest } = user.level;
            const progressBar = new ProgressBar({ ...rest, chunks: 50 });

            const { requiredExp, currentExp } = rest;

            message.channel.send(
                [
                    `Profile: ${username}`,
                    `Balance: ${user.balance}`,
                    `Level: ${currentLevel}`,
                    `Progress: ${progressBar.toString()} ${requiredExp}`,
                    `Experience: ${currentExp}`,
                    `Stat Points: ${user.statPoints}`,
                ].join('\n'),
                {
                    code: true,
                }
            );
        });
    },
};
