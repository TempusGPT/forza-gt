<script lang="ts">
    import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
    import { lerp, range } from "$lib/math";
    import GearInput from "../components/GearInput.svelte";

    interface Validation {
        firstGear: number;
        lastGear: number;
    }

    const lengthMap = {
        Shortest: 1 / 12,
        Shorter: 3 / 12,
        Default: 6 / 12,
        Longer: 7 / 12,
        Longest: 9 / 12,
    } as const;
    type Length = keyof typeof lengthMap;

    let transmission = 6;
    let firstGear = "3.00";
    let lastGear = "1.00";
    let length: Length = "Default";

    let result: number[] = [];
    let dialogOpen = false;
    let dialogMessage = "";

    const validateGears = (): [true, Validation] | [false, string] => {
        const validation: Validation = {
            firstGear: parseFloat(firstGear),
            lastGear: parseFloat(lastGear),
        };

        if (isNaN(validation.firstGear) || isNaN(validation.lastGear)) {
            return [false, "The first gear and the last gear must be numbers."];
        }
        if (validation.firstGear < 0.48 || validation.firstGear > 6) {
            return [false, "The first gear must be between 0.48 and 6.00"];
        }
        if (validation.lastGear < 0.48 || validation.lastGear > 6) {
            return [false, "The last gear must be between 0.48 and 6.00"];
        }
        if (validation.firstGear <= validation.lastGear) {
            return [false, "The first gear must be greater than the last gear."];
        }

        return [true, validation];
    };

    const calculate = () => {
        const [valid, validation] = validateGears();
        if (!valid) {
            openDialog(validation);
            return;
        }

        if (length === "Default") {
            result = calculateArithmetic(transmission, validation.firstGear, validation.lastGear);
            return;
        }

        const ratioMin = (validation.lastGear / validation.firstGear) ** (1 / (transmission - 1));
        const ratioMax = 1 / ratioMin;
        const ratio = lerp(ratioMin, ratioMax, lengthMap[length]);
        result = calculateGeometric(transmission, validation.firstGear, validation.lastGear, ratio);
    };

    const openDialog = (message: string) => {
        dialogOpen = true;
        dialogMessage = message;
    };

    const closeDialog = () => {
        dialogOpen = false;
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
                    {#each Object.keys(lengthMap) as length}
                        <option value={length}>{length}</option>
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

    <dialog open={dialogOpen}>
        <article>
            <h3>Error</h3>
            <p>{dialogMessage}</p>
            <footer>
                <a href="#confirm" role="button" on:click={closeDialog}>OK</a>
            </footer>
        </article>
    </dialog>
</main>
