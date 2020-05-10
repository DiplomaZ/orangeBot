require('dotenv').config();
import { token, prefix } from '../discord.config.json';
import Discord from 'discord.js';
const bot = new Discord.Client();

bot.login(token);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
    const getCommand = (message: Message): string | void => {
        // if first letter isn't prefix -> ! ignore or if message from bot, ignore
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const command = message.content.split(' ')[0].replace(prefix, '');
        return command;
    };
});
