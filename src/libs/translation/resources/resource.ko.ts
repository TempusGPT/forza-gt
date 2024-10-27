import type { Translation } from "./types";

export const ko: Translation = {
    HomePage: {
        nav: {
            sourceCode: "소스 코드",
        },

        hgroup: {
            title: "Forza GT",
            description: "포르자 시리즈를 위한 쉽고 편리한 기어비 튜너",
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
        powerBand: "파워 밴드",
        tuneButton: "기어비 튜닝",

        result: {
            gear: (n) => `${n}단 기어`,
            failed: "실패",
        },
    },

    GearInput: {
        emptyError: "비어있을 수 없습니다.",
        typeError: "숫자여야 합니다.",
        rangeError: (min, max) => `${min}과 ${max} 사이여야 합니다.`,
    },
};
