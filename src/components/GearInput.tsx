import { JSX, Setter, createSignal } from "solid-js";
import { Event as EventLol } from "~/libs/event";

type Props = {
    label: string;
    setValue: Setter<number>;
    validateEvent: EventLol;
};

export default ({ label, setValue, validateEvent }: Props) => {
    const [invalid, setInvalid] = createSignal<true>();

    const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const gearRatio = Number(e.currentTarget.value);

        if (0.48 <= gearRatio && gearRatio <= 6.0) {
            const formatted = gearRatio.toFixed(2);
            e.currentTarget.value = formatted;
            setValue(Number(formatted));
            setInvalid(undefined);
        } else {
            setValue(NaN);
            setInvalid(true);
        }
    };

    validateEvent.addListener(() => console.log("validate"));

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
