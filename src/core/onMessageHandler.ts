import { prefix } from '../../discord.config.json';
import { Message } from 'discord.js';

const onMessageHandler = (msg: Message): void => {
    const getCommand = (message: Message): string | void => {
        // if first letter isn't prefix -> ! ignore or if message from bot, ignore
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const command = message.content.split(' ')[0].replace(prefix, '');
        return command;
    };
};

export default onMessageHandler;
