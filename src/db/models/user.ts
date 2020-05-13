export interface UserConfig {
    id?: number;
    discordID: string;
    balance?: number;
    lastCheckIn: string | undefined;
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
    }

export default User;
