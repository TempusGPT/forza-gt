<script lang="ts">
    import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
    import { lerp, range } from "$lib/math";

    const lengthMap = {
        Shortest: 1 / 12,
        Shorter: 3 / 12,
        Default: 6 / 12,
        Longer: 7 / 12,
        Longest: 9 / 12,
    } as const;
    type Length = keyof typeof lengthMap;

    let transmission: number = 6;
    let firstGear: number = 2.89;
    let lastGear: number = 0.78;
    let length: Length = "Default";
    let result: number[] = calculateArithmetic(transmission, firstGear, lastGear);

    const calculate = () => {
        if (firstGear <= lastGear) {
            alert("First gear must be greater than last gear.");
            return;
        }

        if (length === "Default") {
            result = calculateArithmetic(transmission, firstGear, lastGear);
            return;
        }

        const ratioMin = (lastGear / firstGear) ** (1 / (transmission - 1));
        const ratioMax = 1 / ratioMin;
        const ratio = lerp(ratioMin, ratioMax, lengthMap[length]);
        result = calculateGeometric(transmission, firstGear, lastGear, ratio);
    };
</script>

<svelte:head>
    <title>Geargeist - Gearing Calculator for Forza Series</title>
</svelte:head>

<main>
    <h1>Geargeist</h1>
    <h2>Gearing Calculator for Forza Series</h2>

    <form on:submit|preventDefault={calculate}>
        <label>
            Transmission
            <select bind:value={transmission}>
                {#each range(3, 10) as speed}
                    <option value={speed}>{speed}-Speed</option>
                {/each}
            </select>
        </label>

        <label>
            First Gear
            <input type="number" min="0.48" max="6" step="0.01" required bind:value={firstGear} />
        </label>

        <label>
            Last Gear
            <input type="number" min="0.48" max="6" step="0.01" required bind:value={lastGear} />
        </label>

        <label>
            Length
            <select bind:value={length}>
                {#each Object.keys(lengthMap) as length}
                    <option value={length}>{length}</option>
                {/each}
            </select>
        </label>

        <button>Calculate</button>
    </form>

    <div class="result">
        {#each result as gear, i}
            <div class="gear">
                <div>Gear {i + 1}</div>
                <div>{gear.toFixed(2)}</div>
            </div>
        {/each}
    </div>
</main>

<style>
    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
            Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        margin: 0;
        background-color: #f5f5f5;
    }

    main {
        margin: 10px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: min(400px, calc(100% - 20px));
        box-sizing: border-box;
    }

    h1 {
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    h2 {
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 30px;
        color: #444;
    }

    div {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 15px;
        font-size: 16px;
    }

    input,
    select {
        width: 100%;
        margin-top: 5px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 6px;
        appearance: none;
        background-color: #fff;
        outline: none;
        box-sizing: border-box;
    }

    input:focus,
    select:focus {
        outline: none;
        box-shadow: 0 0 4px rgba(0, 120, 255, 0.5);
        border: 1px solid rgba(0, 120, 255, 0.5);
    }

    button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: none;
        background-color: #007aff;
        color: #fff;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #005ad5;
    }

    .result {
        margin-top: 20px;
        background-color: #f5f5f5;
        padding: 16px 16px 0;
        border-radius: 6px;
    }

    .gear {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .gear:last-child {
        border-bottom: none;
    }
</style>
