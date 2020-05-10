require('dotenv').config();
import { token, prefix } from '../discord.config.json';
import Discord from 'discord.js';
const bot = new Discord.Client();

bot.login(token);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
    if (msg.content === "What's your name?") {
        msg.reply(
            "I don't really have an official name yet, but one of my creators really likes the color orange.",
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
