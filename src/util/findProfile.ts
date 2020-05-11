import { Message, User as DiscordUser } from 'discord.js';
import User from '../model/user';
import database from '../data/database';

const findProfile = (message: Message): User | undefined => {
    const discordUser: DiscordUser = message.author;
    const user = database.find(user => user.getId() === discordUser.id);

    return user;
};

export default findProfile;
