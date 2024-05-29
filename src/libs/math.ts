declare global {
    interface Math {
        lerp: (min: number, max: number, t: number) => number;
        expLerp: (min: number, max: number, t: number) => number;
        approximately: (lhs: number, rhs: number) => boolean;
    }
}

Math.lerp = (min, max, t) => min * (1 - t) + max * t;
Math.expLerp = (min, max, t) => min * (max / min) ** t;
Math.approximately = (lhs, rhs) => Math.abs(lhs - rhs) < Number.EPSILON;

export {};
