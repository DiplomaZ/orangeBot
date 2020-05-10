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
