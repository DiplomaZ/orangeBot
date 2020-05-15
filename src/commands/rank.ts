import { Message, User as DiscordUser } from 'discord.js';
import User from '../db/models/user';
// export default (message: Message): string | void => {
//     // if first letter isn't prefix -> ! ignore or if message from bot, ignore
//     if (!message.content.startsWith(prefix) || message.author.bot) return

//     const command = message.content.split(' ')[0].replace(prefix, '')
//     return command
// }

//Use message contents to infer user that sent message Message.author
//extract ID and find associated profile (findProfile)
//
//modify values (money, currency)
//push new object to database
//

module.exports = {
    name: 'rank',
    description: '',
    execute(message: Message): void {
        const { username, id } = message.author;
        User.find({ orderBy: [{ column: 'experience', order: 'desc' }] }).then(
            users => {
                /**
                 * How do we want to display this
                 *
                 * What are the relavant data to display?
                 * 1. @user | @level | @balance |
                 * 2. @user | @level | @balance |
                 * 3. @user | @level | @balance |
                 * ... so forth
                 */

                // need to do a bit more math with string
                /**
                 * entire line should comprise 70 characters
                 * 4 sections
                 * 1. rank - len ~7 chars
                 * 2. User - len ~ 36 chars
                 * 3. level - len ~ 7 chars
                 * 4. balance - len ~20 chars
                 */

                const rankLength = 8,
                    userLength = 20,
                    levelLength = 8,
                    balanceLength = 15;

                const centerWords = (length: number, word: string): string => {
                    const isOddPadding = (padding): boolean =>
                        padding % 2 === 1;

                    const totalPadding = length - word.length;

                    let leftPadding: number | undefined,
                        rightPadding: number | undefined;

                    const padding = Math.floor(totalPadding / 2);
                    if (isOddPadding(totalPadding)) {
                        leftPadding = padding;
                        rightPadding = padding + 1;
                    }

                    let wordWithPadding: string;

                    if (leftPadding || rightPadding) {
                        wordWithPadding = [
                            ' '.repeat(leftPadding),
                            word,
                            ' '.repeat(rightPadding),
                        ].join('');
                        return wordWithPadding;
                    }
                    wordWithPadding = [
                        ' '.repeat(padding),
                        word,
                        ' '.repeat(padding),
                    ].join('');
                    return wordWithPadding;
                };

                const formattedTextLines = [
                    [
                        centerWords(rankLength, 'Rank'),
                        centerWords(userLength, 'User'),
                        centerWords(levelLength, 'Level'),
                        centerWords(balanceLength, 'Balance'),
                    ].join('|'),
                ];

                //  iterate over users
                users.forEach(async (userObj, index) => {
                    const user = new User(userObj);
                    const textLine = [
                        centerWords(rankLength, (index + 1).toString()),
                        centerWords(
                            userLength,
                            message.guild.members.get(user.discordID).user
                                .username
                        ),
                        centerWords(levelLength, user.level[0].toString()),
                        centerWords(balanceLength, user.balance.toString()),
                    ].join('|');

                    formattedTextLines.push(textLine);
                });
        });
    },
};
