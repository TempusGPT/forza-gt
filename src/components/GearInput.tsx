import { JSX, onMount } from "solid-js";
import { createSignal } from "~/libs/primitive";

const Config = {
    min: 0.48,
    max: 6,
} as const;

export type GearInputRef = {
    validate: () => boolean;
};

export type GearInputProps = {
    label: string;
    onChange?: (value: number) => void;
    ref?: (ref: GearInputRef) => void;
};

export const isGearValid = (gear: number) => {
    return Config.min <= gear && gear <= Config.max;
};

export default (props: GearInputProps) => {
    const input = createSignal("");
    const valid = createSignal(true);
    const placeholder = `${Config.min.toFixed(2)}-${Config.max.toFixed(2)}`;

    const whenValid = (gear: number) => {
        const formatted = gear.toFixed(2);
        props.onChange?.(Number(formatted));
        input.set(formatted);
        valid.set(true);
        return true;
    };

    const whenInvalid = () => {
        props.onChange?.(NaN);
        valid.set(false);
        return false;
    };

    const validate = () => {
        const trimmed = input.get().trim();
        if (trimmed === "") {
            return whenInvalid();
        }

        const gear = Number(trimmed.replaceAll(",", "."));
        return isGearValid(gear) ? whenValid(gear) : whenInvalid();
    };

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        input.set(e.currentTarget.value);
        validate();
    };

    onMount(() => props.ref?.({ validate }));

    return (
        <label>
            <div>{props.label}</div>
            <input
                inputmode="decimal"
                value={input.get()}
                placeholder={placeholder}
                onChange={handleChange}
                aria-invalid={valid.get() ? undefined : true}
            />
        </label>
    );
};
