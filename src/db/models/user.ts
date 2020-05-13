import db from '../database';
import Knex from 'knex';
import { Message } from 'discord.js';
import moment from 'moment';

export interface UserConfig {
    id?: number;
    discordID: string;
    balance?: number;
    lastCheckIn: string | undefined;
}

interface DiscordID {
    type: 'discord-id';
    value: string;
}
class User {
    // read onlys
    id: number;
    discordID: string;
    balance: number;
    lastCheckIn: string | undefined;
    constructor(config: UserConfig) {
        this.discordID = config.discordID;
        this.balance = config.balance >= 0 ? config.balance : 0;
        this.lastCheckIn = config.lastCheckIn;

        // there's always going to be a config.id once load is up
        this.id = config.id;
    }

    public static async load(discordID: DiscordID): Promise<User> {
        const foundResults = await this.findByDiscord(discordID);
        if (foundResults.length > 0) {
            return new User(foundResults[0]);
        }

        const results = await User.add(discordID);
        const discordConfig: DiscordID = {
            value: results[0].discordID,
            type: 'discord-id',
        };

        return User.load(discordConfig);
    }

    static get database(): Knex.QueryBuilder {
        return db('users');
    }

    static find(): Promise<UserConfig[]> {
        // returns all users
        return User.database;
    }

    static findByDiscord(
        value: Message | DiscordID
    ): Promise<UserConfig[] | []> {
        if (value instanceof Message) {
            const id = value.author.id;
            return User.database.where({ discordID: id }).first();
        }

        if (value.type === 'discord-id') {
            return User.database.where({ discordID: value.value }).select('*');
        }
    }

    static findById(id: number): Promise<UserConfig> {
        return User.database.where({ id }).select('*');
    }

    static add(
        discordID: DiscordID
    ): Promise<{ discordID: string; [key: string]: string }[]> {
        // this should be used during constructor
        // adds user to db
        const user = {
            discordID: discordID.value,
        };

        return User.database.insert(user, ['discordID']);
    }

    public checkIn(): void {
        // get now
        const now = moment();
        const last = moment(Number.parseInt(this.lastCheckIn));
        // 12:00 april 1st, next checkin 12:00 april 2
        if (last.diff(now, 'h') >= 24) {
            this.balance += 200;
            this.lastCheckIn = Date.now().toString();
            this.update().then(() => {
                return;
            });
            return;
        }

        throw Error(
            `Unable to check in at this time. Please try again at ${last
                .add(24, 'h')
                .format('HH:mm on MMM Do')}`
        );
    }

    public update(): Promise<UserConfig> {
        /*
         * how to use:
         * user[property] = value // not really
         * user.update() // no returns as user has already been updated
         */

        return User.database
            .update({ ...this }, '*')
            .then(results => {
                return results[0];
            })
            .catch(e => {
                throw e;
            });
    }
    }

export default User;
