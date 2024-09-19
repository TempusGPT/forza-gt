<script lang="ts" module>
    import type { ChangeEventHandler } from "svelte/elements";

    export type DropdownOptions = readonly (readonly [string, number])[];

    type Props = {
        label: string;
        options: DropdownOptions;
        value?: number;
    };
</script>

<script lang="ts">
    let { label, options, value = $bindable() }: Props = $props();

    const eventHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const index = e.currentTarget.selectedIndex;
        value = options[index][1];
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
