export function lerp(min: number, max: number, t: number) {
    return min * (1 - t) + max * t;
}

export function expLerp(min: number, max: number, t: number) {
    return min * (max / min) ** t;
}

export function approximately(lhs: number, rhs: number) {
    return Math.abs(lhs - rhs) < Number.EPSILON;
}
