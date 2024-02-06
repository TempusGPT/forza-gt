const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const tuneArithmetic = (
    transSpeeds: number,
    launchGearPos: number,
    launchGear: number,
    finalGear: number
) => {
    const firstIndex = 1 - launchGearPos;
    const lastIndex = transSpeeds - launchGearPos;

    return range(firstIndex, lastIndex).map((i) => {
        const t = i / lastIndex;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
};

const tuneGeometric = (
    lengthFactor: number,
    transSpeeds: number,
    launchGearPos: number,
    launchGear: number,
    finalGear: number
) => {
    const start = 1 - launchGearPos;
    const end = transSpeeds - launchGearPos;
    const term = lengthFactor ** end - 1;

    return range(start, end).map((i) => {
        const t = (lengthFactor ** i - 1) / term;
        return launchGear / (Math.lerp(finalGear, launchGear, t) / finalGear);
    });
};

export const tuneGearing = (
    lengthFactor: number,
    transSpeeds: number,
    launchGearPos: number,
    launchGear: number,
    finalGear: number
) => {
    return Math.approximately(lengthFactor, 1)
        ? tuneArithmetic(transSpeeds, launchGearPos, launchGear, finalGear)
        : tuneGeometric(lengthFactor, transSpeeds, launchGearPos, launchGear, finalGear);
};
