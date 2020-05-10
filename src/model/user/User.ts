interface BasicStats {
    intelligence: number;
    agility: number;
    strength: number;
}

interface DamageStats {
    damage: number;
}

interface ArmorStats {
    hitPoints: number;
    armor: number;
}

interface UserStats extends BasicStats, DamageStats, ArmorStats {
    level: number;
}

interface UserConfig {
    name: string;
    balance: number;
    hitPoints: number;
    level: number;
    strength: number;
    agility: number;
    intelligence: number;
    damage: number;
    armor: number;
}

class User {
    private name: string;
    private balance: number;
    private stats: UserStats;

    constructor(config: UserConfig) {
        const {
            name = '',
            balance = 0,
            hitPoints = 0,
            level = 1,
            strength = 1,
            agility = 1,
            intelligence = 1,
            damage = 10,
            armor = 10,
        } = config;

        const stats = {
            hitPoints,
            level,
            strength,
            agility,
            intelligence,
            damage,
            armor,
        };
        this.name = name;
        this.balance = balance;
        this.stats = stats;
    }

    public getName(): string {
        return this.name;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getStats(): UserStats {
        return this.stats;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public checkIn(): void {
        this.balance = this.balance + 200;
    }
}

export default User;
