interface ProgressBarConfig {
    currentExp: number;
    requiredExp: number;
    chunks?: number;
}

class ProgressBar {
    currentExp: number;
    requiredExp: number;
    chunks: number;
    fill: string;
    empty: string;

    constructor(config: ProgressBarConfig) {
        this.fill = '■';
        this.empty = '□';

        Object.keys(config).forEach(property => {
            if (property === 'chunks' && !config[property]) this[property] = 30;
            this[property] = config[property];
        });
    }

    public toString(): string {
        const percentToGoal = this.currentExp / this.requiredExp; // some %
        const fillAmount = percentToGoal * this.chunks;
        return [
            this.fill.repeat(fillAmount),
            this.empty.repeat(this.chunks - fillAmount),
        ].join('');
    }
}

export default ProgressBar;
