<script lang="ts" context="module">
    import type { DropdownOptions } from "@libs/Dropdown.svelte";
    import { homePage as intl } from "@libs/intl";

    const powerBandOptions: DropdownOptions<number> = [
        [intl.powerBand.veryNarrow, 0.2],
        [intl.powerBand.narrow, 0.35],
        [intl.powerBand.normal, 0.5],
        [intl.powerBand.wide, 0.65],
        [intl.powerBand.veryWide, 0.8],
    ];

    const transmissionOptions: DropdownOptions<number> = [
        [intl.transmission[3], 3],
        [intl.transmission[4], 4],
        [intl.transmission[5], 5],
        [intl.transmission[6], 6],
        [intl.transmission[7], 7],
        [intl.transmission[8], 8],
        [intl.transmission[9], 9],
        [intl.transmission[10], 10],
    ];
</script>

<script lang="ts">
    import Dropdown from "@libs/Dropdown.svelte";
    import GearInput, { isGearValid } from "@libs/GearInput.svelte";
    import { tuneGearing } from "@libs/tuner";
    import type { EventHandler } from "svelte/elements";

    let launchGearInput: GearInput;
    let topSpeedGearInput: GearInput;

    let powerBand = $state(powerBandOptions[2][1]);
    let transmission = $state(transmissionOptions[4][1]);
    let launchGear = $state(NaN);
    let topSpeedGear = $state(NaN);
    let calculation = $state<number[]>();

    function tune(launchGearNumber: number) {
        const launchGearValidation = launchGearInput.validate();
        const topSpeedGearValidation = topSpeedGearInput.validate();

        if (!launchGearValidation || !topSpeedGearValidation) {
            return;
        }

        const factorMin = (topSpeedGear / launchGear) ** (1 / (transmission - 1));
        const factor = Math.expLerp(factorMin, 1 / factorMin, powerBand);
        calculation = tuneGearing(factor, transmission, launchGearNumber, launchGear, topSpeedGear);
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
            <a href="https://github.com/TempusGPT/forza-gt">{intl.nav.sourceCode}</a>
        </li>
    </ul>
</nav>

<main class="container">
    <hgroup>
        <h1>{intl.hgroup.title}</h1>
        <h2>{intl.hgroup.description}</h2>
    </hgroup>

    <form onsubmit={handleTune(1)}>
        <div class="grid">
            <Dropdown
                label={intl.powerBand.label}
                options={powerBandOptions}
                bind:value={powerBand}
            />

            <Dropdown
                label={intl.transmission.label}
                options={transmissionOptions}
                bind:value={transmission}
            />

            <GearInput
                label={intl.gear.launch}
                placeholder="2.89"
                bind:value={launchGear}
                bind:this={launchGearInput}
            />

            <GearInput
                label={intl.gear.topSpeed}
                placeholder="0.78"
                bind:value={topSpeedGear}
                bind:this={topSpeedGearInput}
            />
        </div>

        <div class="grid">
            <input
                type="button"
                class="secondary"
                onclick={handleTune(2)}
                value={intl.button.secondary}
            />

            <input type="submit" value={intl.button.primary} />
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
                        <div>{intl.result.cruising}</div>
                    {:else}
                        <div>{intl.result.gear(i + 1)}</div>
                    {/if}

                    {#if isGearValid(gear)}
                        <div>{gear.toFixed(2)}</div>
                    {:else}
                        <div>{intl.result.failed}</div>
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
