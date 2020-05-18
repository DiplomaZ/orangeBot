import User from '../db/models/user';
import { Message } from 'discord.js';

type UserCallBack = (user: User) => void;

export const loadProfile = (data: Message | string, cb: UserCallBack): void => {
    User.load({
        type: 'discord-id',
        value: data instanceof Message ? data.author.id : data,
    }).then(cb);
};
