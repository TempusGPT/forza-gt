declare global {
    interface Math {
        lerp: (min: number, max: number, t: number) => number;
        expLerp: (min: number, max: number, t: number) => number;
    }
}

Math.lerp = (min: number, max: number, t: number) => {
    return min * (1 - t) + max * t;
};

Math.expLerp = (min: number, max: number, t: number) => {
    return min * (max / min) ** t;
};

export {};
