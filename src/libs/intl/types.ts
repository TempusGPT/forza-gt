export type Intl = {
    homePage: {
        nav: {
            sourceCode: string;
        };

        hgroup: {
            title: string;
            description: string;
        };

        powerBand: {
            label: string;
            veryNarrow: string;
            narrow: string;
            normal: string;
            wide: string;
            veryWide: string;
        };

        transmission: {
            label: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
        };

        gear: {
            launch: string;
            topSpeed: string;
        };

        button: {
            primary: string;
            secondary: string;
        };

        result: {
            gear: (n: number) => string;
            cruising: string;
            failed: string;
        };
    };

    gearInput: {
        emptyError: string;
        typeError: string;
        rangeError: (min: string, max: string) => string;
    };
};
