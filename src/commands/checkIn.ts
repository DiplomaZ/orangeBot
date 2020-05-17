import { Message, User as DiscordUser } from 'discord.js';
import User from '../db/models/user';
import moment from 'moment';

module.exports = {
    name: 'check-in',
    description: '',
    execute(message: Message, args): void {
        const { username, id } = message.author;
        User.load({ type: 'discord-id', value: id }).then(user => {
            try {
                user.checkIn();
                const date = moment(
                    new Date(Number.parseInt(user.lastCheckIn))
                );
                message.channel.send(
                    `Thanks for checking in ${message.guild.members.get(
                        user.discordID
                    )}. Last check in is ${date.format('MMMM Do - HH:mm')}`
                );
            } catch (e) {
                message.channel.send(e.message);
            }
        });
    },
};
