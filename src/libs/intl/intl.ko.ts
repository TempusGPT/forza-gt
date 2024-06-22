import type { Intl } from "./types";

export const ko: Intl = {
    homePage: {
        nav: {
            sourceCode: "소스 코드",
        },

        hgroup: {
            title: "Forza GT",
            description: "포르자 시리즈를 위한 쉽고 편리한 기어비 튜너",
        },

        powerBand: {
            label: "파워 밴드",
            veryNarrow: "매우 좁음",
            narrow: "좁음",
            normal: "보통",
            wide: "넓음",
            veryWide: "매우 넓음",
        },

        transmission: {
            label: "트랜스미션",
            3: "3단",
            4: "4단",
            5: "5단",
            6: "6단",
            7: "7단",
            8: "8단",
            9: "9단",
            10: "10단",
        },

        launchGear: "출발 기어",
        topSpeedGear: "최고 속도 기어",
        tuneButton: "기어비 튜닝",

        result: {
            gear: (n) => `${n}단 기어`,
            failed: "실패",
        },
    },

    gearInput: {
        emptyError: "비어있을 수 없습니다.",
        typeError: "숫자여야 합니다.",
        rangeError: (min, max) => `${min}과 ${max} 사이여야 합니다.`,
    },
};
