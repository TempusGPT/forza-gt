<script lang="ts">
    import { calculateGearing } from "$lib/calculator";
    import { expLerp, lerp, range } from "$lib/math";
    import GearInput from "$lib/components/GearInput.svelte";
    import Dialog, { getDialog } from "$lib/components/Dialog.svelte";

    const lengthMap = {
        "Level 0 (Short)": 0.0,
        "Level 1": 0.1,
        "Level 2": 0.2,
        "Level 3": 0.3,
        "Level 4": 0.4,
        "Level 5 (Medium)": 0.5,
        "Level 6": 0.6,
        "Level 7": 0.7,
        "Level 8": 0.8,
        "Level 9": 0.9,
        "Level 10 (Long)": 1.0,
    } as const;

    type Length = keyof typeof lengthMap;
    type Validation = { firstGear: number; lastGear: number };

    let transmission = 6;
    let firstGear = "3.00";
    let lastGear = "1.00";
    let length: Length = "Level 5 (Medium)";
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

    const calculate = () => {
        const [error, validation] = validateGears();
        if (error !== null) {
            getDialog(error)?.open();
            return;
        }

        const minRatio = (validation.lastGear / validation.firstGear) ** (1 / (transmission - 1));
        const ratio = expLerp(minRatio, 1 / minRatio, 0.5);
        result = calculateGearing(transmission, validation.firstGear, validation.lastGear, ratio);
    };
</script>

<main class="container">
    <div class="headings">
        <h1>Geargeist</h1>
        <h2>Gearing Calculator for Forza Series</h2>
    </div>

    <form on:submit|preventDefault={calculate}>
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

        <button>Calculate</button>
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
