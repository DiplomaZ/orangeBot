import { Message, User as DiscordUser } from 'discord.js';
import User from '../model/user';
import { findProfile } from '../util';
import database from '../data/database';

module.exports = {
    name: 'profile',
    description: '',
    execute(message: Message, arg): void {
        const profile: User | undefined = findProfile(message);

        if (!profile) {
            // create user
            const { username, id } = message.author;
            const user = new User({ id, name: username });

            // "save" to database
            database.push(user);
            console.log('not hello world');
            message.channel.send(user.toString());
            return;
        }

        // there was a profile
        console.log('hello world');
        message.channel.send(profile.toString());
    },
};
