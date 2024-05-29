const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const tuneArithmetic = (
    speeds: number,
    launchGearNumber: number,
    launchGear: number,
    finalGear: number,
) => {
    const firstIndex = 1 - launchGearNumber;
    const lastIndex = speeds - launchGearNumber;

    return range(firstIndex, lastIndex + 1).map((i) => {
        const t = i / lastIndex;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
};

const tuneGeometric = (
    factor: number,
    speeds: number,
    launchGearNumber: number,
    launchGear: number,
    finalGear: number,
) => {
    const firstIndex = 1 - launchGearNumber;
    const lastIndex = speeds - launchGearNumber;
    const term = factor ** lastIndex - 1;

    return range(firstIndex, lastIndex + 1).map((i) => {
        const t = (factor ** i - 1) / term;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
};

export const tuneGearing = (
    factor: number,
    speeds: number,
    launchGearNumber: number,
    launchGear: number,
    finalGear: number,
) => {
    return Math.approximately(factor, 1)
        ? tuneArithmetic(speeds, launchGearNumber, launchGear, finalGear)
        : tuneGeometric(factor, speeds, launchGearNumber, launchGear, finalGear);
};
