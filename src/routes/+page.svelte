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

<header class="container">
    <div class="headings">
        <h1>Geargeist</h1>
        <h2>Gearing Calculator for Forza Series</h2>
    </div>
</header>

<main class="container">
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

    <article>
        {#each result as gear, i}
            {#if i !== 0}
                <hr />
            {/if}
            <nav>
                <div>Gear {i + 1}</div>
                <div>{gear.toFixed(2)}</div>
            </nav>
        {/each}
    </article>
</main>
