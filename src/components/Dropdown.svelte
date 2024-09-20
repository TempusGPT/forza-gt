<script lang="ts" module>
    import type { ChangeEventHandler } from "svelte/elements";

    export type DropdownOption = readonly [string, number];
    export type DropdownOptions = readonly DropdownOption[];

    type Props = {
        label: string;
        options: DropdownOptions;
        value?: number;
    };
</script>

<script lang="ts">
    let { label, options, value = $bindable(options[0][1]) }: Props = $props();

    const eventHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const index = e.currentTarget.selectedIndex;
        value = options[index][1];
    };
</script>

<label>
    <div>{label}</div>
    <select {value} onchange={eventHandler}>
        {#each options as [name, value]}
            <option {value}>{name}</option>
        {/each}
    </select>
</label>
