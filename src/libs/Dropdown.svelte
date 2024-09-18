<script lang="ts" context="module">
    import type { ChangeEventHandler } from "svelte/elements";

    export type DropdownValue = string | number | string[] | undefined;
    export type DropdownOptions<T extends DropdownValue> = readonly (readonly [string, T])[];

    type Props<T extends DropdownValue> = {
        label: string;
        options: DropdownOptions<T>;
        value?: T;
    };
</script>

<script lang="ts" generics="T extends DropdownValue">
    let { label, options, value = $bindable() }: Props<T> = $props();

    const eventHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const index = e.currentTarget.selectedIndex;
        if (0 <= index && index < options.length) {
            value = options[index][1];
        }
    };
</script>

<label>
    <div>{label}</div>
    <select value={value ?? options[0][1]} onchange={eventHandler}>
        {#each options as [name, value]}
            <option {value}>{name}</option>
        {/each}
    </select>
</label>
