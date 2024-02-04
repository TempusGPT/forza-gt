import { JSX, createSignal } from "solid-js";
import { Delegate } from "~/lib/delegate";

type Props = {
    label: string;
    onChange?: (value: number) => void;
    validation?: Delegate;
};

export default ({ label, onChange, validation }: Props) => {
    const [value, setValue] = createSignal("");
    const [invalid, setInvalid] = createSignal<true>();

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        setValue(e.currentTarget.value);
        validate();
    };

    const validate = () => {
        const gearRatio = Number(value());

        if (0.48 <= gearRatio && gearRatio <= 6.0) {
            const formatted = gearRatio.toFixed(2);
            onChange?.(Number(formatted));
            setValue(formatted);
            setInvalid(undefined);
        } else {
            onChange?.(NaN);
            setInvalid(true);
        }
    };

    validation?.add(validate);

    return (
        <label>
            {label}
            <input
                placeholder="0.48-6.00"
                inputmode="numeric"
                value={value()}
                onChange={handleChange}
                aria-invalid={invalid()}
            />
        </label>
    );
};
