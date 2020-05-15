import 'dotenv/config'
import { token } from '../discord.config.json'
import { onMessageHandler } from './core'
import Discord from 'discord.js'
import fs from 'fs'
import path from 'path'

const bot = new Discord.Client()


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
bot.commands = new Discord.Collection()
const readInCommands = (): void => {
    fs.readdirSync(path.join(__dirname, 'commands'))
        .filter(file => file.endsWith('.ts'))
        .forEach(async fileName => {
            const command = await import(`./commands/${fileName}`)
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            bot.commands.set(command.name, command)
        })
}
readInCommands()

bot.login(token)

const users = [];

interface TempUser {
    id: string;
    balance: number;
    name: string;
}

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', onMessageHandler(bot))
