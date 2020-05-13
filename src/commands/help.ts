/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Message, Collection } from 'discord.js';

module.exports = {
    name: 'help',
    description: '',
    execute(message: Message, arg): void {
        // get commands

        const helpCommands =
            // @ts-ignore
            Array.from(message.client.commands.keys()).reduce(
                (prev: string, next) => {
                    return prev.concat(`\n!${next}`);
                },
                'Help commands'
            );

        message.channel.sendCode('js', helpCommands);
    },
};
