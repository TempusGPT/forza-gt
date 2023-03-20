import { lerp, range } from "$lib/math";

export const calculateArithmetic = (speed: number, first: number, last: number) => {
    return range(0, speed - 1).map((i) => {
        const t = i / (speed - 1);
        return first / (lerp(last, first, t) / last);
    });
};

export const calculateGeometric = (speed: number, first: number, last: number, ratio: number) => {
    const lastTerm = ratio ** (speed - 1) - 1;
    return range(0, speed - 1).map((i) => {
        const t = (ratio ** i - 1) / lastTerm;
        return first / (lerp(last, first, t) / last);
    });
};
