require('dotenv').config();
import { token, prefix } from '../discord.config.json';
import Discord from 'discord.js';
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

        );
        // msg.channel.send("pong");
    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    }
});
