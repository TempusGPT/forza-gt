import { expLerp } from "$lib/math";
import { tuneGearing } from "$lib/tuner";
import { getErrorMessage, parse } from "$lib/utils";
import type { Action, Actions, Load } from "@sveltejs/kit";

const form = {
    transmission: {
        name: "Transmission",
        default: 6,
        options: [3, 4, 5, 6, 7, 8, 9, 10],
    },
    firstGear: {
        name: "First Gear",
        default: "",
        placeholder: "2.89",
    },
    lastGear: {
        name: "Last Gear",
        default: "",
        placeholder: "0.78",
    },
    length: {
        name: "Length",
        default: 0.5,
        options: [
            { name: "Shortest", value: 0.2 },
            { name: "Shorter", value: 0.3 },
            { name: "Short", value: 0.4 },
            { name: "Medium", value: 0.5 },
            { name: "Long", value: 0.6 },
            { name: "Longer", value: 0.7 },
            { name: "Longest", value: 0.8 },
        ],
    },
};

const formAction: Action = async ({ request }) => {
    try {
        const formData = await validateForm(request);
        const minRatio =
            (formData.lastGear / formData.firstGear) ** (1 / (formData.transmission - 1));
        const ratio = expLerp(minRatio, 1 / minRatio, formData.length);

        return {
            result: tuneGearing(
                formData.transmission,
                formData.firstGear,
                formData.lastGear,
                ratio
            ),
        };
    } catch (e) {
        return { error: getErrorMessage(e) };
    }
};

const validateForm = async (request: Request) => {
    const formData = await request.formData();
    const transmission = parse(formData, form.transmission.name).toNumber();
    const firstGear = parse(formData, form.firstGear.name).toNumber();
    const lastGear = parse(formData, form.lastGear.name).toNumber();
    const length = parse(formData, form.length.name).toNumber();

    if (!form.transmission.options.includes(transmission)) {
        throw new Error("Transmission must be one of the options.");
    }

    if (firstGear < 0.48 || firstGear > 6 || lastGear < 0.48 || lastGear > 6) {
        throw new Error("First Gear and Last Gear must be between 0.48 and 6.00.");
    }

    if (firstGear <= lastGear) {
        throw new Error("First Gear must be greater than Last Gear.");
    }

    if (form.length.options.every((len) => len.value !== length)) {
        throw new Error("Length must be one of the options.");
    }

    return { transmission, firstGear, lastGear, length };
};

export const load: Load = () => {
    return { form };
};

export const actions: Actions = {
    default: formAction,
};
