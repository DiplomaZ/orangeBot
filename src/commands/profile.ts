import { Message } from 'discord.js';
import User, { UserConfig } from '../db/models/user';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, arg): void {
        const { username, id } = message.author;
        User.load({ type: 'discord-id', value: id }).then(user => {
            message.channel.send(
                `Hello, ${username}, how are you today? Your account balance is ${user.balance}.`
            );
        });
    },
};
