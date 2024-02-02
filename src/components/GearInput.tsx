import { JSX, Setter, createSignal } from "solid-js";

type Props = {
    label: string;
    setValue: Setter<number>;
};

export default ({ label, setValue }: Props) => {
    const [invalid, setInvalid] = createSignal<true>();
    const isValid = (gearRatio: number) => 0.48 <= gearRatio && gearRatio <= 6.0;

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const gearRatio = Number(e.currentTarget.value);

        if (isValid(gearRatio)) {
            const formatted = gearRatio.toFixed(2);
            e.currentTarget.value = formatted;
            setValue(Number(formatted));
            setInvalid(undefined);
        } else {
            setValue(NaN);
            setInvalid(true);
        }
    };

    return (
        <label>
            {label}
            <input
                placeholder="0.48-6.00"
                inputmode="numeric"
                onChange={handleChange}
                aria-invalid={invalid()}
            />
        </label>
    );
};
