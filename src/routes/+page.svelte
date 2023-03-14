<script lang="ts">
  import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
  import { lerp } from "$lib/math";

  let speed: number = 6;
  let first: number = 2.89;
  let last: number = 0.78;
  let shape: string = "Default";
  let strength: number = 0.5;
  let result: number[] = [];

  const validateFirst = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (value < 0.48) {
      target.value = "0.48";
    } else if (value > 6) {
      target.value = "6";
    } else {
      target.value = value.toFixed(2);
    }
    first = parseFloat(target.value);
  };

  const validateLast = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (value < 0.48) {
      target.value = "0.48";
    } else if (value > 6) {
      target.value = "6";
    } else {
      target.value = value.toFixed(2);
    }
    last = parseFloat(target.value);
  };

  const validateStrength = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (value < 0.1) {
      target.value = "0.1";
    } else if (value > 1) {
      target.value = "1";
    } else {
      target.value = value.toFixed(1);
    }
    strength = parseFloat(target.value);
  };

  const calculate = () => {
    if (shape === "Default") {
      result = [...calculateArithmetic(speed, first, last)];
      return;
    }

    const ratioMin = (last / first) ** (1 / (speed - 1));
    const ratioMax = 1 / ratioMin;

    if (shape === "Longer") {
      const ratio = lerp(1, ratioMax, strength);
      result = [...calculateGeometric(speed, first, last, ratio)];
    } else if (shape === "Shorter") {
      const ratio = lerp(1, ratioMin, strength);
      result = [...calculateGeometric(speed, first, last, ratio)];
    }
  };
</script>

<svelte:head>
  <title>Geargeist - Gearing Calculator for Forza Series</title>
</svelte:head>

<div>
  <label for="speed">Speed</label>
  <select name="speed" bind:value={speed}>
    {#each [3, 4, 5, 6, 7, 8, 9, 10] as speed}
      <option value={speed}>{speed}</option>
    {/each}
  </select>
</div>

<div>
  <label for="first">First</label>
  <input
    name="first"
    type="number"
    step="0.01"
    bind:value={first}
    on:blur={validateFirst}
  />
</div>

<div>
  <label for="last">Last</label>
  <input
    name="last"
    type="number"
    step="0.01"
    bind:value={last}
    on:blur={validateLast}
  />
</div>

<div>
  <label for="shape">Shape</label>
  <select name="shape" bind:value={shape}>
    <option>Default</option>
    <option>Longer</option>
    <option>Shorter</option>
  </select>
</div>

{#if shape !== "Default"}
  <div>
    <label for="shape">Strength</label>
    <input
      name="shape"
      type="number"
      step="0.1"
      bind:value={strength}
      on:blur={validateStrength}
    />
  </div>
{/if}

<button on:click={calculate}>Calculate</button>
<div>
  {#each result as gear, i}
    <div>{i + 1}: {gear.toFixed(2)}</div>
  {/each}
</div>
