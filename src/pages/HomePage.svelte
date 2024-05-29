<script lang="ts" context="module">
    import type { DropdownOptions } from "@libs/Dropdown.svelte";

    const powerBandOptions: DropdownOptions<number> = [
        ["Very Narrow", 0.2],
        ["Narrow", 0.35],
        ["Normal", 0.5],
        ["Wide", 0.65],
        ["Very Wide", 0.8],
    ];

    const transmissionOptions: DropdownOptions<number> = [
        ["3 Speed", 3],
        ["4 Speed", 4],
        ["5 Speed", 5],
        ["6 Speed", 6],
        ["7 Speed", 7],
        ["8 Speed", 8],
        ["9 Speed", 9],
        ["10 Speed", 10],
    ];
</script>

<script lang="ts">
    import Dropdown from "@libs/Dropdown.svelte";
    import GearInput, { isGearValid } from "@libs/GearInput.svelte";
    import { tuneGearing } from "@libs/tuner";
    import type { EventHandler } from "svelte/elements";

    let launchGearInput: GearInput;
    let finalGearInput: GearInput;

    let powerBand = $state(powerBandOptions[2][1]);
    let transmission = $state(transmissionOptions[4][1]);
    let launchGear = $state(NaN);
    let finalGear = $state(NaN);
    let calculation = $state<number[]>();

    function tune(launchGearNumber: number) {
        const launchGearValidation = launchGearInput.validate();
        const finalGearValidation = finalGearInput.validate();

        if (!launchGearValidation || !finalGearValidation) {
            return;
        }

        const factorMin = (finalGear / launchGear) ** (1 / (transmission - 1));
        const factor = Math.expLerp(factorMin, 1 / factorMin, powerBand);
        calculation = tuneGearing(factor, transmission, launchGearNumber, launchGear, finalGear);
    }

    function handleTune(launchGearNumber: number): EventHandler {
        return (e) => {
            e.preventDefault();
            tune(launchGearNumber);
        };
    }
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

    <form onsubmit={handleTune(1)}>
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
                onclick={handleTune(2)}
                value="Tune second gear launch"
            />

            <input type="submit" value="Tune first gear launch" />
        </div>
    </form>

    {#if calculation}
        {@const cruising = calculation.length < 11}
        {@const gearing = calculation.slice(0, 10)}

        <article>
            {#each gearing as gear, i}
                {#if i !== 0}
                    <hr />
                {/if}

                <nav>
                    {#if cruising && i === gearing.length - 1}
                        <div>Cruising</div>
                    {:else}
                        <div>Gear {i + 1}</div>
                    {/if}

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
        --pico-typography-spacing-vertical: 0.6rem;
    }
</style>
