import { For, JSX, createSignal } from "solid-js";

type Props<T> = {
    label: string;
    options: T[];
    defaultIndex: number;
    nameSelector: (option: T) => JSX.Element;
    valueSelector: (option: T) => string | number | string[] | undefined;
};

export default <T,>({ label, options, defaultIndex, nameSelector, valueSelector }: Props<T>) => {
    const [value, setValue] = createSignal(valueSelector(options[defaultIndex]));

    const handleChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
        const index = e.currentTarget.selectedIndex;
        if (0 <= index && index < options.length) {
            setValue(valueSelector(options[e.currentTarget.selectedIndex]));
        }
    };

    return (
        <label>
            {label}
            <select name={label} value={value()} onChange={handleChange}>
                <For each={options}>
                    {(t) => <option value={valueSelector(t)}>{nameSelector(t)}</option>}
                </For>
            </select>
        </label>
    );
};
