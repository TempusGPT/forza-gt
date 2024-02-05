import { JSX, onCleanup, onMount } from "solid-js";
import { Delegate } from "~/lib/delegate";
import { createState } from "~/lib/primitive";

type Props = {
    label: string;
    onChange?: (value: number) => void;
    validation?: Delegate;
};

export default (props: Props) => {
    const input = createState({
        value: "",
        valid: true,
    });

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        input.value = e.currentTarget.value;
        validate();
    };

    const validate = () => {
        const gearRatio = Number(input.value);

        if (0.48 <= gearRatio && gearRatio <= 6.0) {
            const formatted = gearRatio.toFixed(2);
            props.onChange?.(Number(formatted));
            input.value = formatted;
            input.valid = true;
        } else {
            props.onChange?.(NaN);
            input.valid = false;
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
                value={input.value}
                onChange={handleChange}
                aria-invalid={input.valid ? undefined : true}
            />
        </label>
    );
};
