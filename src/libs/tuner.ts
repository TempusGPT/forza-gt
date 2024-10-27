export function tuneGearing(
    transmission: number,
    launchGear: number,
    finalGear: number,
    factor: number,
): number[] {
    return Math.approximately(factor, 1)
        ? tuneArithmetic(transmission, launchGear, finalGear)
        : tuneGeometric(transmission, launchGear, finalGear, factor);
}

function tuneArithmetic(transmission: number, launchGear: number, finalGear: number): number[] {
    const firstIndex = 0;
    const lastIndex = transmission - 1;

    return range(firstIndex, lastIndex).map((i) => {
        const t = i / lastIndex;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
}

function tuneGeometric(
    transmission: number,
    launchGear: number,
    finalGear: number,
    factor: number,
): number[] {
    const firstIndex = 0;
    const lastIndex = transmission - 1;
    const term = factor ** lastIndex - 1;

    return range(firstIndex, lastIndex).map((i) => {
        const t = (factor ** i - 1) / term;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
}

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, k) => start + k);
}
