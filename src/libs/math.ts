export const lerp = (min: number, max: number, t: number) => {
    return min * (1 - t) + max * t;
};

export const expLerp = (min: number, max: number, t: number) => {
    return min * (max / min) ** t;
};
