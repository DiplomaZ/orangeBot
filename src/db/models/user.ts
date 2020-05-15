import db from '../database';
import Knex from 'knex';
import { Message } from 'discord.js';
import moment from 'moment';

export interface UserConfig {
    id?: number;
    discordID: string;
    balance?: number;
    lastCheckIn: string | undefined;
    experience: number;
}

interface DiscordID {
    type: 'discord-id';
    value: string;
}

interface KnexConfig {
    orderBy: {
        column: string;
        order?: string;
    }[];
}

/** 
 * Experimental
 * 
interface UserStateHistory {
    id?: number | undefined;
    discordID?: string | undefined;
}

*/
class User {
    // read onlys
    id: number;
    discordID: string;
    balance: number;
    lastCheckIn: string | undefined;
    experience: number;
    // oldState: UserStateHistory; experimental
    constructor(config: UserConfig) {
        this.discordID = config.discordID;
        this.balance = config.balance >= 0 ? config.balance : 0;
        this.lastCheckIn = config.lastCheckIn;
        this.experience = config.experience;

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

    static find(config?: KnexConfig): Promise<UserConfig[]> {
        // returns all users
        if (!config) return User.database.select('*');

        if (config.orderBy) {
            console.log(config.orderBy);
            return User.database.orderBy(config.orderBy);
        }
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

    public get level(): number[] {
        let level = 1;
        let expToNextLevel = 500;
        let totalExperienceLeft = this.experience;

        while (totalExperienceLeft > expToNextLevel) {
            // each iteration increase level
            level = level + 1;

            // subtract exp to exit loop
            totalExperienceLeft =
                totalExperienceLeft - Math.floor(expToNextLevel);

            // increase required exp
            // 10% of base each level
            // after 10 levels, base + +2%
            // after 25 levels, base + +3% going forward for total of 15.566%
            expToNextLevel =
                level <= 10
                    ? expToNextLevel * 1.1
                    : level > 10 && level <= 20
                    ? expToNextLevel * 1.1 * 1.02
                    : expToNextLevel * 1.1 * 1.02 * 1.03;
        }

        return [level, totalExperienceLeft, Math.floor(expToNextLevel)];
    }

    public checkIn(): void {
        // get now
        const now = moment();
        const last = moment(Number.parseInt(this.lastCheckIn));
        // 12:00 april 1st, next checkin 12:00 april 2
        if (now.diff(last, 'h') >= 24) {
            this.balance += 200;
            this.lastCheckIn = Date.now().toString();
            this.experience =
                this.experience + Math.floor(Math.random() * 100) + 100;
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

    public updateExperience(exp: number): Promise<User> {
        this.experience = this.experience + exp;
        return this.update().then(user => user);
    }

    private update(): Promise<User> {
        /*
         * how to use:
         * user[property] = value // not really
         * user.update() // no returns as user has already been updated
         */

        const { id, ...rest } = this;

        return User.database
            .where({ id })
            .update({ ...rest }, ['*'])
            .then(results => {
                return new User(results[0]);
            })
            .catch(e => {
                throw e;
            });
    }
}

export default User;
