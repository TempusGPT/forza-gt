<script lang="ts">
    import { calculateGearing } from "$lib/calculator";
    import { expLerp, lerp, range } from "$lib/math";
    import GearInput from "$lib/components/GearInput.svelte";
    import Dialog, { getDialog } from "$lib/components/Dialog.svelte";

    type Length =
        | "Extremely Short"
        | "Very Short"
        | "Short"
        | "Medium"
        | "Long"
        | "Very Long"
        | "Extremely Long";

    type LengthMap = { [key in Length]: number };
    type Validation = { firstGear: number; lastGear: number };

    let transmission = 6;
    let firstGear = "3.00";
    let lastGear = "1.00";
    let length: Length = "Medium";
    let result: number[] = [];

    const lengthMap: LengthMap = {
        "Extremely Short": lerp(0.1, 0.9, 0 / 6),
        "Very Short": lerp(0.1, 0.9, 1 / 6),
        Short: lerp(0.1, 0.9, 2 / 6),
        Medium: lerp(0.1, 0.9, 3 / 6),
        Long: lerp(0.1, 0.9, 4 / 6),
        "Very Long": lerp(0.1, 0.9, 5 / 6),
        "Extremely Long": lerp(0.1, 0.9, 6 / 6),
    };

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

        const ratioMin = (validation.lastGear / validation.firstGear) ** (1 / (transmission - 1));
        const ratioMax = 1 / ratioMin;
        const ratio = expLerp(ratioMin, ratioMax, lengthMap[length]);
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
                        <option value={speed}>{speed}-Speed</option>
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
