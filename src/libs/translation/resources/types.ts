export type Translation = {
    HomePage: {
        nav: {
            sourceCode: string;
        };

        hgroup: {
            title: string;
            description: string;
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

        launchGear: string;
        topSpeedGear: string;
        powerBand: string;
        tuneButton: string;

        result: {
            gear: (n: number) => string;
            failed: string;
        };
    };

    GearInput: {
        emptyError: string;
        typeError: string;
        rangeError: (min: string, max: string) => string;
    };
};
