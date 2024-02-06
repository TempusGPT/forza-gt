import { JSX, onCleanup, onMount } from "solid-js";
import { Delegate } from "~/libs/delegate";
import { createSignal } from "~/libs/primitive";

type Props = {
    label: string;
    onChange?: (value: number) => void;
    validation?: Delegate;
};

export default (props: Props) => {
    const input = createSignal("");
    const valid = createSignal(true);

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        input.set(e.currentTarget.value);
        validate();
    };

    const validate = () => {
        const gearRatio = Number(input.get());

        if (0.48 <= gearRatio && gearRatio <= 6.0) {
            const formatted = gearRatio.toFixed(2);
            props.onChange?.(Number(formatted));
            input.set(formatted);
            valid.set(true);
        } else {
            props.onChange?.(NaN);
            valid.set(false);
        }
    };

    onMount(() => props.validation?.add(validate));
    onCleanup(() => props.validation?.remove(validate));

    return (
        <label>
            {props.label}
            <input
                placeholder="0.48-6.00"
                inputmode="numeric"
                value={input.get()}
                onChange={handleChange}
                aria-invalid={valid.get() ? undefined : true}
            />
        </label>
    );
};
