import type { Intl } from "./types";

export const en: Intl = {
    homePage: {
        nav: {
            sourceCode: "Source code",
        },

        hgroup: {
            title: "Forza GT",
            description: "Convenient gearing tuner for the Forza series",
        },

        powerBand: {
            label: "Power band",
            veryNarrow: "Very narrow",
            narrow: "Narrow",
            normal: "Normal",
            wide: "Wide",
            veryWide: "Very wide",
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

        launchGear: "Launch gear",
        topSpeedGear: "Top speed gear",
        tuneButton: "Tune gearing",

        result: {
            gear: (n) => `Gear ${n}`,
            failed: "Failed",
        },
    },

    gearInput: {
        emptyError: "Cannot be empty.",
        typeError: "Must be a number.",
        rangeError: (min, max) => `Must be between ${min} and ${max}.`,
    },
};
