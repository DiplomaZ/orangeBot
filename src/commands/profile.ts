import { Message } from 'discord.js';
import { loadProfile } from '../util/';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, arg): void {
        const { username } = message.author;
        loadProfile(message, user => {
            const { currentLevel, ...rest } = user.level;

            const { requiredExp, currentExp } = rest;

            message.channel.send(
                [
                    `Profile: ${username}`,
                    `Balance: ${user.balance}`,
                    `Level: ${currentLevel}`,
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
