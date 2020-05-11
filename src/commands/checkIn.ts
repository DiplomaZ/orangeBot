import { Message, User as DiscordUser } from 'discord.js';
import User from '../model/user';
import { findProfile } from '../util';
import database from '../data/database';
import { type } from 'os';
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
        const profile: User | undefined = findProfile(message);

        if (profile) {
            const secondsElapsed: number =
                (Date.now() - profile.getLastCheckin()) / 1000;

            if (secondsElapsed > 24 * 60 * 60) {
                profile.checkIn();
                message.channel.send(profile.greeting());
                return;
            }
            console.log(secondsElapsed);

            const dayInMinutes = 60 * 60 * 24;
            const differenceInMinutes = dayInMinutes - secondsElapsed / 60;

            message.channel.send(
                `You cannot check in for another ${differenceInMinutes.toFixed(
                    0
                )} minutes`
            );
            return;
        }
        const { username, id } = message.author;
        const user = new User({ id, name: username });

        // "save" to database
        database.push(user);

        message.channel.send(
            `Profile not found, created profile for user ${user.getName()}`
        );
        user.checkIn();
        message.channel.send(user.greeting());
    },
};
