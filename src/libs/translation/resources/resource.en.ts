import type { Translation } from "./types";

export const en: Translation = {
    HomePage: {
        nav: {
            sourceCode: "Source code",
        },

        hgroup: {
            title: "Forza GT",
            description: "Convenient gearing tuner for the Forza series",
        },

        transmission: {
            label: "Transmission",
            3: "3 speed",
            4: "4 speed",
            5: "5 speed",
            6: "6 speed",
            7: "7 speed",
            8: "8 speed",
            9: "9 speed",
            10: "10 speed",
        },

        powerBand: {
            label: "Power band",
            narrow: "Narrow",
            bitNarrow: "Bit narrow",
            medium: "Medium",
            bitWide: "Bit wide",
            wide: "Wide",
        },

        launchGear: "Launch gear",
        topSpeedGear: "Top speed gear",
        tuneButton: "Tune gearing",

        result: {
            gear: (n) => `Gear ${n}`,
            failed: "Failed",
        },
    },

    GearInput: {
        emptyError: "Cannot be empty.",
        typeError: "Must be a number.",
        rangeError: (min, max) => `Must be between ${min} and ${max}.`,
    },
};
