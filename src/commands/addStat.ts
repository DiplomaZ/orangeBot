import { Message } from 'discord.js';
import User, { UserConfig } from '../db/models/user';

module.exports = {
    name: 'quack',
    description: '',
    execute(message: Message, [stat, amount]: string[]): void {
        const { username, id } = message.author;

        User.load({ type: 'discord-id', value: id }).then(user => {
            try {
                user.addStats(stat, Number.parseInt(amount));

                message.channel.send(
                    [
                        `Stat added successfully, ${message.guild.members.get(
                            user.discordID
                        )}! Your stat balance is now ${user.getStats}.`,
                        `your new ${stat} level is ${user.getUserStat(stat)}`,
                    ].join('\n')
                );
            } catch (e) {
                message.channel.send(e.message);
            }
        });
    },
};
