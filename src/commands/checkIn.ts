import { Message, User as DiscordUser } from 'discord.js';
import User from '../db/models/user';
import moment from 'moment';
// export default (message: Message): string | void => {
//     // if first letter isn't prefix -> ! ignore or if message from bot, ignore
//     if (!message.content.startsWith(prefix) || message.author.bot) return

//     const command = message.content.split(' ')[0].replace(prefix, '')
//     return command
// }

//Use message contents to infer user that sent message Message.author
//extract ID and find associated profile (findProfile)
//
//modify values (money, currency)
//push new object to database
//

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
