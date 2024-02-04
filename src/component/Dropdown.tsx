import { For, JSX } from "solid-js";

type Props<T extends DropdownValue> = {
    label: string;
    options: DropdownOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
};

export type DropdownValue = string | number | string[] | undefined;
export type DropdownOption<T extends DropdownValue> = { name: string; value: T };

export default <T extends DropdownValue>({ label, options, value, onChange }: Props<T>) => {
    const handleChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
        const index = e.currentTarget.selectedIndex;
        if (0 <= index && index < options.length) {
            onChange?.(options[index].value);
        }
    };

    return (
        <label>
            {label}
            <select value={value ?? options[0].value} onChange={handleChange}>
                <For each={options}>
                    {(option) => <option value={option.value}>{option.name}</option>}
                </For>
            </select>
        </label>
    );
};
