<script lang="ts" context="module">
    import type { DropdownOption } from "~/components/Dropdown.svelte";

    const options: DropdownOption<number>[] = [
        { name: "Shortest", value: 0.2 },
        { name: "Shorter", value: 0.3 },
        { name: "Short", value: 0.4 },
        { name: "Medium", value: 0.5 },
        { name: "Long", value: 0.6 },
        { name: "Longer", value: 0.7 },
        { name: "Longest", value: 0.8 },
    ];
</script>

<script lang="ts">
    import Dropdown from "~/components/Dropdown.svelte";
    import GearInput from "~/components/GearInput.svelte";
</script>

<main class="container">
    <hgroup>
        <h1>Home Page</h1>
        <h1>Welcome to the home page</h1>
    </hgroup>

    <Dropdown label="Dropdown" {options} />
    <GearInput label="GearInput" />
</main>
