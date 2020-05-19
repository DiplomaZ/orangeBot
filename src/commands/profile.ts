import { Message } from 'discord.js';
import { loadProfile } from '../util/';
import ProgressBar from '../db/models/progressBar';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, [profile]: string[]): void {
        const mentionToken = '<@!';

        if (
            profile &&
            !profile.startsWith(mentionToken) &&
            !profile.endsWith('>')
        ) {
            message.channel.send(
                'Unrecognized user. Try typing in `!profile @<username>`'
            );
            return;
        }

        const discordID =
            typeof profile === 'string'
                ? profile.replace(mentionToken, '').replace('>', '')
                : '';

        if (discordID && message.guild.members.get(discordID).user.bot) {
            message.channel.send(
                "You cannot pull up a bot's profile because it does not exist"
            );
            return;
        }

        const data: string | Message = profile ? discordID : message;

        loadProfile(data, user => {
            const { currentLevel, ...rest } = user.level;
            const progressBar = new ProgressBar({ ...rest, chunks: 50 });

            const { requiredExp, currentExp } = rest;

            message.channel.send(
                [
                    `Profile: ${
                        message.guild.members.get(user.discordID).user.username
                    }`,
                    `Balance: ${user.balance}`,
                    `Level: ${currentLevel}`,
                    `Progress: ${progressBar.toString()} ${requiredExp}`,
                    `Experience: ${currentExp}`,
                    `Stat Points: ${user.statPoints}`,
                    `strength: ${user.getUserStat('strength')}`,
                    `agility: ${user.getUserStat('agility')}`,
                    `defense: ${user.getUserStat('defense')}`,
                    `magic: ${user.getUserStat('magic')}`,
                    `range: ${user.getUserStat('range')}`,
                    `hitpoints: ${user.getUserStat('hitpoints')}`,
                ].join('\n'),
                {
                    code: true,
                }
            );
        });
    },
};
