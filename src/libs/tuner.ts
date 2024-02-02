import { lerp } from "~/libs/math";

const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const tuneArithmetic = (speed: number, first: number, last: number) => {
    return range(0, speed - 1).map((i) => {
        const t = i / (speed - 1);
        return first / (lerp(last, first, t) / last);
    });
};

const tuneGeometric = (speed: number, first: number, last: number, ratio: number) => {
    const lastTerm = ratio ** (speed - 1) - 1;
    return range(0, speed - 1).map((i) => {
        const t = (ratio ** i - 1) / lastTerm;
        return first / (lerp(last, first, t) / last);
    });
};

export const tuneGearing = (speed: number, first: number, last: number, ratio: number) => {
    return ratio === 1
        ? tuneArithmetic(speed, first, last)
        : tuneGeometric(speed, first, last, ratio);
};
