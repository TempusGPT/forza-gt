import { For, JSX } from "solid-js";

type Props<T> = {
    label: string;
    options: T[];
    nameSelector: (option: T) => JSX.Element;
    valueSelector: (option: T) => string | number | string[] | undefined;
};

export default <T,>({ label, options, nameSelector, valueSelector }: Props<T>) => {
    return (
        <label>
            {label}
            <select name={label}>
                <For each={options}>
                    {(t) => <option value={valueSelector(t)}>{nameSelector(t)}</option>}
                </For>
            </select>
        </label>
    );
};
