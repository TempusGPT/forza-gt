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
    import GearingGraph from "@libs/GearingGraph.svelte";
    import { tuneGearing } from "@libs/tuner";
    import type { EventHandler } from "svelte/elements";

    let launchGearInput: GearInput;
    let topSpeedGearInput: GearInput;

    let powerBand = $state(powerBandOptions[2][1]);
    let transmission = $state(transmissionOptions[3][1]);
    let launchGear = $state(NaN);
    let topSpeedGear = $state(NaN);
    let gearing = $state([2.89, 1.88, 1.39, 1.1, 0.91, 0.78]);

    const tuneHandler: EventHandler = (e) => {
        e.preventDefault();
        const launchGearValidation = launchGearInput.validate();
        const topSpeedGearValidation = topSpeedGearInput.validate();

        if (!launchGearValidation || !topSpeedGearValidation) {
            return;
        }

        const factorMin = (topSpeedGear / launchGear) ** (1 / (transmission - 1));
        const factor = Math.expLerp(factorMin, 1 / factorMin, powerBand);
        gearing = tuneGearing(transmission, launchGear, topSpeedGear, factor);
    };
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

    <div class="grid">
        <article>
            <form onsubmit={tuneHandler}>
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
                    label={intl.launchGear}
                    placeholder="2.89"
                    bind:value={launchGear}
                    bind:this={launchGearInput}
                />

                <GearInput
                    label={intl.topSpeedGear}
                    placeholder="0.78"
                    bind:value={topSpeedGear}
                    bind:this={topSpeedGearInput}
                />

                <input type="submit" value={intl.tuneButton} />
            </form>
        </article>

        <article>
            <div>
                <div class="graph">
                    <GearingGraph {gearing} />
                </div>

                {#each gearing as gear, i}
                    <hr />

                    <nav>
                        <div>{intl.result.gear(i + 1)}</div>

                        {#if isGearValid(gear)}
                            <div>{gear.toFixed(2)}</div>
                        {:else}
                            <div>{intl.result.failed}</div>
                        {/if}
                    </nav>
                {/each}
            </div>
        </article>
    </div>
</main>

<style>
    hr {
        margin: 0.6rem 0;
    }

    .grid {
        row-gap: 0;
    }

    .graph {
        margin-bottom: 1rem;
    }
</style>
