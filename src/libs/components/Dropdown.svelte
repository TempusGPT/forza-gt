<script lang="ts" module>
    import type { ChangeEventHandler } from "svelte/elements";

    export type DropdownOption = {
        name: string;
        value: number;
    };

    type Props = {
        label: string;
        options: DropdownOption[];
        value?: number;
    };
</script>

<script lang="ts">
    let { label, options, value = $bindable(options[0].value) }: Props = $props();

    const eventHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const index = e.currentTarget.selectedIndex;
        value = options[index].value;
    };
</script>

<label>
    {label}

    <select {value} onchange={eventHandler}>
        {#each options as { name, value }}
            <option {value}>{name}</option>
        {/each}
    </select>
</label>
