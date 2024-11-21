<script lang="ts" module>
    import type { EventHandler } from "svelte/elements";

    import Range, { type RangePreset } from "@libs/components/Range.svelte";
    import Dropdown, { type DropdownOption } from "@libs/components/Dropdown.svelte";
    import GearingInput, { isGearValid } from "@libs/components/GearingInput.svelte";
    import GearingGraph from "@libs/components/GearingGraph.svelte";

    import "@libs/math";
    import { tuneGearing } from "@libs/tuner";
    import { useTranslation } from "@libs/translation";

    const t = useTranslation("HomePage");

    const transmissionOptions: DropdownOption[] = $derived([
        { name: t.transmission[3], value: 3 },
        { name: t.transmission[4], value: 4 },
        { name: t.transmission[5], value: 5 },
        { name: t.transmission[6], value: 6 },
        { name: t.transmission[7], value: 7 },
        { name: t.transmission[8], value: 8 },
        { name: t.transmission[9], value: 9 },
        { name: t.transmission[10], value: 10 },
    ]);

    const powerBandPresets: RangePreset[] = [
        { name: t.powerBand.narrow, value: -10 },
        { name: t.powerBand.bitNarrow, value: -5 },
        { name: t.powerBand.medium, value: 0 },
        { name: t.powerBand.bitWide, value: 5 },
        { name: t.powerBand.wide, value: 10 },
    ];
</script>

<script lang="ts">
    let launchGear = $state<number>();
    let topSpeedGear = $state<number>();
    let transmission = $state(transmissionOptions[4].value);
    let powerBand = $state(powerBandPresets[2].value);
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
            const t = 0.5 + (0.3 * powerBand) / 10;
            const factor = Math.expLerp(factorMin, 1 / factorMin, t);
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

                    <Dropdown
                        label={t.transmission.label}
                        options={transmissionOptions}
                        bind:value={transmission}
                    />

                    <Range
                        label={t.powerBand.label}
                        min={-10}
                        max={10}
                        presets={powerBandPresets}
                        bind:value={powerBand}
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
