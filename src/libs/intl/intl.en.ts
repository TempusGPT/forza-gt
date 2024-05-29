import type { Intl } from "./types";

export const en: Intl = {
    homePage: {
        nav: {
            sourceCode: "Source code",
        },

        hgroup: {
            title: "Forza GT",
            description: "Convenient gearing tuner for the Forza series.",
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
            3: "3 Speed",
            4: "4 Speed",
            5: "5 Speed",
            6: "6 Speed",
            7: "7 Speed",
            8: "8 Speed",
            9: "9 Speed",
            10: "10 Speed",
        },

        gear: {
            launch: "Launch gear",
            topSpeed: "Top speed gear",
        },

        button: {
            primary: "Tune first gear launch",
            secondary: "Tune second gear launch",
        },

        result: {
            gear: (n) => `Gear ${n}`,
            cruising: "Cruising",
            failed: "Failed",
        },
    },

    gearInput: {
        emptyError: "Cannot be empty.",
        typeError: "Must be a number.",
        rangeError: (min, max) => `Must be between ${min} and ${max}.`,
    },
};
