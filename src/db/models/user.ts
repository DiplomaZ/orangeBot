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
    }

export default User;
