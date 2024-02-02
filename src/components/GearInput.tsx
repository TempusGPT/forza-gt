import { JSX, createSignal } from "solid-js";

type Props = {
    label: string;
};

export default ({ label }: Props) => {
    const [value, setValue] = createSignal("");
    const [invalid, setInvalid] = createSignal<true>();
    const inRange = (value: number) => 0.48 <= value && value <= 6.0;

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const floatValue = parseFloat(e.currentTarget.value);
        setInvalid(inRange(floatValue) ? undefined : true);
        isNaN(floatValue) || setValue(floatValue.toFixed(2));
    };

    return (
        <label>
            {label}
            <input
                name={label}
                placeholder="0.48-6.00"
                inputmode="numeric"
                value={value()}
                onChange={handleChange}
                aria-invalid={invalid()}
            />
        </label>
    );
};
