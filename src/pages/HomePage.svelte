<script lang="ts" context="module">
    import type { DropdownOption } from "@libs/Dropdown.svelte";

    const powerBandOptions: DropdownOption<number>[] = [
        { name: "Very Narrow", value: 0.2 },
        { name: "Narrow", value: 0.35 },
        { name: "Normal", value: 0.5 },
        { name: "Wide", value: 0.65 },
        { name: "Very Wide", value: 0.8 },
    ] as const;

    const transmissionOptions: DropdownOption<number>[] = [
        { name: "3 Speed", value: 3 },
        { name: "4 Speed", value: 4 },
        { name: "5 Speed", value: 5 },
        { name: "6 Speed", value: 6 },
        { name: "7 Speed", value: 7 },
        { name: "8 Speed", value: 8 },
        { name: "9 Speed", value: 9 },
        { name: "10 Speed", value: 10 },
    ] as const;
</script>

<script lang="ts">
    import type { EventHandler } from "svelte/elements";
    import Dropdown from "@libs/Dropdown.svelte";
    import GearInput, { isGearValid } from "@libs/GearInput.svelte";
    import { tuneGearing } from "@libs/tuner";

    let launchGearInput: GearInput;
    let finalGearInput: GearInput;

    let powerBand = $state(powerBandOptions[2].value);
    let transmission = $state(transmissionOptions[4].value);
    let launchGear = $state(NaN);
    let finalGear = $state(NaN);
    let calculation = $state<number[]>();

    const tune = (launchGearNumber: number) => {
        const launchGearValidation = launchGearInput.validate();
        const finalGearValidation = finalGearInput.validate();

        if (!launchGearValidation || !finalGearValidation) {
            return;
        }

        const factorMin = (finalGear / launchGear) ** (1 / (transmission - 1));
        const factor = Math.expLerp(factorMin, 1 / factorMin, powerBand);
        calculation = tuneGearing(factor, transmission, launchGearNumber, launchGear, finalGear);
    };

    const tuneFirstGearLaunch: EventHandler = (e) => {
        e.preventDefault();
        tune(1);
    };

    const tuneSecondGearLaunch = () => {
        tune(2);
    };
</script>

<nav class="container-fluid">
    <ul></ul>
    <ul>
        <li>
            <a href="https://github.com/TempusGPT/forza-gt">Source Code</a>
        </li>
    </ul>
</nav>

<main class="container">
    <hgroup>
        <h1>Forza GT</h1>
        <h2>Convenient gearing tuner for the Forza series</h2>
    </hgroup>

    <form onsubmit={tuneFirstGearLaunch}>
        <div class="grid">
            <Dropdown label="Power Band" options={powerBandOptions} bind:value={powerBand} />

            <Dropdown
                label="Transmission"
                options={transmissionOptions}
                bind:value={transmission}
            />

            <GearInput
                label="Launch Gear"
                placeholder="2.89"
                bind:value={launchGear}
                bind:this={launchGearInput}
            />

            <GearInput
                label="Final Gear"
                placeholder="0.78"
                bind:value={finalGear}
                bind:this={finalGearInput}
            />
        </div>

        <div class="grid">
            <input
                type="button"
                class="secondary"
                onclick={tuneSecondGearLaunch}
                value="Tune second gear launch"
            />

            <input type="submit" value="Tune first gear launch" />
        </div>
    </form>

    {#if calculation}
        <article>
            {#each calculation as gear, i}
                {#if i !== 0}
                    <hr />
                {/if}

                <nav>
                    <div>Gear {i + 1}</div>
                    {#if isGearValid(gear)}
                        <div>{gear.toFixed(2)}</div>
                    {:else}
                        <div>Failed</div>
                    {/if}
                </nav>
            {/each}
        </article>
    {/if}
</main>

<style>
    hr {
        margin: 0.6rem 0;
    }
</style>
