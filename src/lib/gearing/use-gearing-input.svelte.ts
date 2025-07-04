import { m } from "$lib/paraglide/messages";
import type { ChangeEventHandler, FocusEventHandler } from "svelte/elements";

type GearInputProps = {
    value: string;
    "aria-invalid": boolean;
    onchange: ChangeEventHandler<HTMLInputElement>;
    onblur: FocusEventHandler<HTMLInputElement>;
};

type GearInput = {
    props: GearInputProps;
    value: number;
    error: string | null;
    validate: () => boolean;
    format: () => void;
};

type GearingInput = {
    launchGear: GearInput;
    finalGear: GearInput;
};

export function useGearingInput(min?: number, max?: number): GearingInput {
    const orderError = $state<{ value: string | null }>({ value: null });
    const launchGear = useGearInput(validateOrderForLaunchGear, orderError, min, max);
    const finalGear = useGearInput(validateOrderForFinalGear, orderError, min, max);

    function validateOrderForLaunchGear(value: number) {
        return validateOrder(value, finalGear.value);
    }

    function validateOrderForFinalGear(value: number) {
        return validateOrder(launchGear.value, value);
    }

    return { launchGear, finalGear };
}

function useGearInput(
    validateOrder: (value: number) => string | null,
    orderError: { value: string | null },
    min?: number,
    max?: number,
): GearInput {
    let input = $state("");
    let emptyError = $state<string | null>(null);
    let numberError = $state<string | null>(null);
    let rangeError = $state<string | null>(null);

    const value = $derived(toNumber(input));
    const error = $derived(orderError.value ?? emptyError ?? numberError ?? rangeError);

    const props = $derived<GearInputProps>({
        value: input,
        "aria-invalid": error !== null,

        onchange: (e) => {
            input = e.currentTarget.value;

            if (error) {
                if (!validateOrder(value)) orderError.value = null;
                if (!validateEmpty(input)) emptyError = null;
                if (!validateNumber(input, value)) numberError = null;
                if (!validateRange(value, min, max)) rangeError = null;
            }
        },

        onblur: () => {
            validate();
            format();
        },
    });

    function validate() {
        const orderValidation = validateOrder(value);
        const emptyValidation = validateEmpty(input);
        const numberValidation = validateNumber(input, value);
        const rangeValidation = validateRange(value, min, max);

        orderError.value = orderValidation;
        emptyError = emptyValidation;
        numberError = numberValidation;
        rangeError = rangeValidation;

        return !orderValidation && !emptyValidation && !numberValidation && !rangeValidation;
    }

    function format() {
        if (isNaN(value)) {
            return;
        }

        input = value.toFixed(2);
    }

    return {
        get props() {
            return props;
        },
        get value() {
            return value;
        },
        get error() {
            return error;
        },
        validate,
        format,
    };
}

function validateOrder(launchGearValue: number, finalGearValue: number) {
    if (launchGearValue < finalGearValue) {
        return m["useGearingInput.orderError"]();
    }

    return null;
}

function validateEmpty(input: string) {
    if (input === "") {
        return m["useGearingInput.emptyError"]();
    }

    return null;
}

function validateNumber(input: string, value: number) {
    if (input !== "" && isNaN(value)) {
        return m["useGearingInput.numberError"]();
    }

    return null;
}

function validateRange(value: number, min: number | undefined, max: number | undefined) {
    if (min !== undefined && value < min) {
        return m["useGearingInput.minRangeError"]({ n: min });
    }

    if (max !== undefined && value > max) {
        return m["useGearingInput.maxRangeError"]({ n: max });
    }

    return null;
}

function toNumber(value: string) {
    return value === "" ? NaN : Number(value);
}
