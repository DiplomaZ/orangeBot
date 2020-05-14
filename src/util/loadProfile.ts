import User from '../db/models/user';
import { Message } from 'discord.js';

type UserCallBack = (user: User) => void;

export const loadProfile = ({ author }: Message, cb: UserCallBack): void => {
    User.load({ type: 'discord-id', value: author.id }).then(cb);
};
