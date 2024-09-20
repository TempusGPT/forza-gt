<script lang="ts" module>
    import type { EventHandler } from "svelte/elements";

    import Dropdown, { type DropdownOptions } from "@components/Dropdown.svelte";
    import GearingInput, { isGearValid } from "@components/GearingInput.svelte";
    import GearingGraph from "@components/GearingGraph.svelte";

    import "@libs/math";
    import { tuneGearing } from "@libs/tuner";
    import { useTranslation } from "@libs/translation";

    const t = useTranslation("HomePage");

    const powerBandOptions: DropdownOptions = $derived([
        [t.powerBand.veryNarrow, 0.2],
        [t.powerBand.narrow, 0.35],
        [t.powerBand.normal, 0.5],
        [t.powerBand.wide, 0.65],
        [t.powerBand.veryWide, 0.8],
    ]);

    const transmissionOptions: DropdownOptions = $derived([
        [t.transmission[3], 3],
        [t.transmission[4], 4],
        [t.transmission[5], 5],
        [t.transmission[6], 6],
        [t.transmission[7], 7],
        [t.transmission[8], 8],
        [t.transmission[9], 9],
        [t.transmission[10], 10],
    ]);
</script>

<script lang="ts">
    let powerBand = $state(powerBandOptions[2][1]);
    let transmission = $state(transmissionOptions[4][1]);
    let launchGear = $state<number>();
    let topSpeedGear = $state<number>();
    let gearing = $state([2.89, 1.99, 1.52, 1.23, 1.03, 0.89, 0.78]);

    let launchGearInput: GearingInput;
    let topSpeedGearInput: GearingInput;

    const tuneHandler: EventHandler = (e) => {
        e.preventDefault();

        launchGearInput.validateNotEmpty();
        topSpeedGearInput.validateNotEmpty();
        launchGearInput.format();
        topSpeedGearInput.format();

        if (launchGear && topSpeedGear) {
            const factorMin = (topSpeedGear / launchGear) ** (1 / (transmission - 1));
            const factor = Math.expLerp(factorMin, 1 / factorMin, powerBand);
            gearing = tuneGearing(transmission, launchGear, topSpeedGear, factor);
        }
    };
</script>

<nav class="container-fluid">
    <ul></ul>
    <ul>
        <li>
            <a href="https://github.com/TempusGPT/forza-gt">{t.nav.sourceCode}</a>
        </li>
    </ul>
</nav>

<main class="container">
    <hgroup>
        <h1>{t.hgroup.title}</h1>
        <h2>{t.hgroup.description}</h2>
    </hgroup>

    <div class="grid">
        <article>
            <form onsubmit={tuneHandler}>
                <fieldset>
                    <Dropdown
                        label={t.powerBand.label}
                        options={powerBandOptions}
                        bind:value={powerBand}
                    />

                    <Dropdown
                        label={t.transmission.label}
                        options={transmissionOptions}
                        bind:value={transmission}
                    />

                    <GearingInput
                        label={t.launchGear}
                        placeholder="2.89"
                        min={topSpeedGear}
                        bind:value={launchGear}
                        bind:this={launchGearInput}
                    />

                    <GearingInput
                        label={t.topSpeedGear}
                        placeholder="0.78"
                        max={launchGear}
                        bind:value={topSpeedGear}
                        bind:this={topSpeedGearInput}
                    />
                </fieldset>

                <input type="submit" value={t.tuneButton} />
            </form>
        </article>

        <article>
            <div>
                <div class="graph">
                    <GearingGraph {gearing} />
                </div>

                {#each gearing as gear, i}
                    <hr class="line" />

                    <nav>
                        <div>{t.result.gear(i + 1)}</div>

                        {#if isGearValid(gear)}
                            <div>{gear.toFixed(2)}</div>
                        {:else}
                            <div>{t.result.failed}</div>
                        {/if}
                    </nav>
                {/each}
            </div>
        </article>
    </div>
</main>

<style>
    .line {
        margin: 0.6rem 0;
    }

    .grid {
        row-gap: 0;
    }

    .graph {
        margin-bottom: 1rem;
    }
</style>
