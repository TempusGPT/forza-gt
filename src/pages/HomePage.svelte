<script lang="ts" context="module">
    import type { DropdownOption } from "~/components/Dropdown.svelte";

    const lengthOptions: DropdownOption<number>[] = [
        { name: "Shorter", value: 0.2 },
        { name: "Short", value: 0.35 },
        { name: "Medium", value: 0.5 },
        { name: "Long", value: 0.65 },
        { name: "Longer", value: 0.8 },
    ] as const;

    const transOptions: DropdownOption<number>[] = [
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
    import Dropdown from "~/components/Dropdown.svelte";
    import GearInput, { isGearValid } from "~/components/GearInput.svelte";
    import { tuneGearing } from "~/libs/tuner";

    let launchGearInput: GearInput;
    let finalGearInput: GearInput;

    let length = $state(lengthOptions[2].value);
    let trans = $state(transOptions[4].value);
    let launchGear = $state(NaN);
    let finalGear = $state(NaN);
    let calculation = $state<number[]>();

    const calculate = (launchGearPos: number) => {
        const launchGearValidation = launchGearInput.validate();
        const finalGearValidation = finalGearInput.validate();
        if (!launchGearValidation || !finalGearValidation) {
            return;
        }

        const minFactor = (finalGear / launchGear) ** (1 / (trans - 1));
        const lengthFactor = Math.expLerp(minFactor, 1 / minFactor, length);
        calculation = tuneGearing(lengthFactor, trans, launchGearPos, launchGear, finalGear);
    };

    const handleSubmit: EventHandler = (e) => {
        e.preventDefault();
        calculate(1);
    };
</script>

<main class="container">
    <hgroup>
        <h1>ForzaOne Gearing Tuner</h1>
        <h2>Tune gearing for different lengths and transmissions, magically.</h2>
    </hgroup>

    <form onsubmit={handleSubmit}>
        <div class="grid">
            <Dropdown label="Length" options={lengthOptions} bind:value={length} />
            <Dropdown label="Transmission" options={transOptions} bind:value={trans} />

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
                onclick={() => calculate(2)}
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

<style lang="scss">
    hr {
        margin: 0.6rem 0;
    }
</style>
