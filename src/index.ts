import 'dotenv/config';
import { token, prefix } from '../discord.config.json';
import Discord, { Message, User } from 'discord.js';
const bot = new Discord.Client();

bot.login(token);

const users = [];

interface TempUser {
    id: string;
    balance: number;
    name: string;
}

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
    const getCommand = (message: Message): string | undefined => {
        // if first letter isn't prefix -> ! ignore or if message from bot, ignore
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const command = message.content.split(' ')[0].replace(prefix, '');
        return command;
    };

    const createUser = (user: User): TempUser => {
        // create user
        // ! TODO: refactor into class
        const newUser: TempUser = {
            id: user.id,
            balance: 0,
            name: user.username,
        };

        // add user to 'db'
        // ! TODO: implement save to db
        users.push(newUser);

        user.lastMessage.channel.send(
            'Profile created due to existing user not having profile',
        );

        return newUser;
    };

    const findProfile = (user: User): TempUser | undefined => {
        const profile: TempUser | undefined = users.find(
            (u) => u.id === user.id,
        );
        return profile;
    };

    const command: string | undefined = getCommand(msg);

    if (!command) return;
});
