import { Message, Client } from 'discord.js'

const onMessageHandler = (client: Client) => (message: Message): void => {
        // if first letter isn't prefix -> ! ignore or if message from bot, ignore
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

        const command = message.content.split(' ')[0].replace(prefix, '');
        return command;
    };
};

