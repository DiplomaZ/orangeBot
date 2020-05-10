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
    }
}

export default User;
