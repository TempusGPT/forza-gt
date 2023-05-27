<script lang="ts">
    import { tuneGearing } from "$lib/tuner";
    import { expLerp, range } from "$lib/math";
    import GearInput from "$lib/components/GearInput.svelte";
    import Dialog, { getDialog } from "$lib/components/Dialog.svelte";

    const lengthMap = {
        Medium: 1,
        Short: 0.8333333333333334,
        Shorter: 0.6666666666666666,
        Shortest: 0.5,
    } as const;

    type Length = keyof typeof lengthMap;
    type Validation = { firstGear: number; lastGear: number };

    let transmission = 7;
    let firstGear = "4.00";
    let lastGear = "1.00";
    let length: Length = "Medium";
    let result: number[] = [];

    const validateGears = (): [null, Validation] | [string] => {
        const validation: Validation = {
            firstGear: parseFloat(firstGear),
            lastGear: parseFloat(lastGear),
        };

        if (isNaN(validation.firstGear) || isNaN(validation.lastGear)) {
            return ["NaN"];
        }

        if (
            validation.firstGear < 0.48 ||
            validation.firstGear > 6 ||
            validation.lastGear < 0.48 ||
            validation.lastGear > 6
        ) {
            return ["Gear"];
        }

        if (validation.firstGear <= validation.lastGear) {
            return ["Range"];
        }

        return [null, validation];
    };

    const tune = () => {
        const [error, validation] = validateGears();
        if (error !== null) {
            getDialog(error)?.open();
            return;
        }

        const minRatio = (validation.lastGear / validation.firstGear) ** (1 / (transmission - 1));
        const ratio = expLerp(minRatio, 1, lengthMap[length]);
        result = tuneGearing(transmission, validation.firstGear, validation.lastGear, ratio);
    };
</script>

<main class="container">
    <div class="headings">
        <h1>Alyxer's Gearing Tuner</h1>
        <h2>Designed to tune gears between first and last gears</h2>
    </div>

    <form on:submit|preventDefault={tune}>
        <div class="grid">
            <label>
                Transmission
                <select bind:value={transmission}>
                    {#each range(3, 10) as speed}
                        <option value={speed}>{speed} Speed</option>
                    {/each}
                </select>
            </label>

            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                First Gear
                <GearInput bind:value={firstGear} />
            </label>

            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                Last Gear
                <GearInput bind:value={lastGear} />
            </label>

            <label>
                Length
                <select bind:value={length}>
                    {#each Object.keys(lengthMap) as len}
                        <option value={len}>{len}</option>
                    {/each}
                </select>
            </label>
        </div>

        <button>Tune</button>
    </form>

    <div>
        {#each result as gear, i}
            {#if i !== 0}
                <hr />
            {/if}
            <nav>
                <div>Gear {i + 1}</div>
                <div>{gear.toFixed(2)}</div>
            </nav>
        {/each}
    </div>
</main>

<Dialog id="NaN" title="Error" message="The first gear and the last gear must be numbers." />
<Dialog
    id="Gear"
    title="Error"
    message="The first gear and the last gear must be between 0.48 and 6.00"
/>
<Dialog id="Range" title="Error" message="The first gear must be greater than the last gear." />
