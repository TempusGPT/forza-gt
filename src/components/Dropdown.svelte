<script lang="ts" context="module">
    export type DropdownValue = string | number | string[] | undefined;
    export type DropdownOption<T extends DropdownValue> = { name: string; value: T };

    export type DropdownProps<T extends DropdownValue> = {
        label: string;
        options: DropdownOption<T>[];
        value?: T;
        onChange?: (value: T) => void;
    };
</script>

<script lang="ts" generics="T extends DropdownValue">
    import type { ChangeEventHandler } from "svelte/elements";

    const { label, options, value, onChange }: DropdownProps<T> = $props();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const index = e.currentTarget.selectedIndex;
        if (0 <= index && index < options.length) {
            onChange?.(options[index].value);
        }
    };
</script>

<label>
    <div>{label}</div>
    <select value={value ?? options[0].value} onchange={handleChange}>
        {#each options as { name, value }}
            <option {value}>{name}</option>
        {/each}
    </select>
</label>
