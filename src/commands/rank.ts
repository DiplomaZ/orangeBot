import { Message, User as DiscordUser } from 'discord.js';
import User from '../db/models/user';
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
    name: 'rank',
    description: '',
    execute(message: Message): void {
        const { username, id } = message.author;
        User.find().then(users => {
            console.log(users);
        });
    },
};
