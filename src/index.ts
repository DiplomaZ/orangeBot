import 'dotenv/config';
import { token } from '../discord.config.json';
import { onMessageHandler } from './core';
import Discord from 'discord.js';

const bot = new Discord.Client();

bot.login(token);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', onMessageHandler);
