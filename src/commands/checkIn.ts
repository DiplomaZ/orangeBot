import { Message } from 'discord.js'

// export default (message: Message): string | void => {
//     // if first letter isn't prefix -> ! ignore or if message from bot, ignore
//     if (!message.content.startsWith(prefix) || message.author.bot) return

//     const command = message.content.split(' ')[0].replace(prefix, '')
//     return command
// }

module.exports = {
    name: 'check-in',
    description: '',
    execute(message: Message, args): void {
        const profile: User | undefined = findProfile(message);

        if (profile) {
        message.channel.send('Hello World')
        }
    },
}
