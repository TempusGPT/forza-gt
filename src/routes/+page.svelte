<script lang="ts">
  import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
  import { lerp } from "$lib/math";

  let speed: number = 6;
  let first: number = 2.89;
  let last: number = 0.78;
  let shape: number = 0.5;
  let result: number[] = [];

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const validate = (
    e: FocusEvent,
    options: { min: number; max: number; digit: number },
    variableToSet: (value: number) => void
  ) => {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (value < options.min) {
      target.value = options.min.toFixed(options.digit);
    } else if (value > options.max) {
      target.value = options.max.toFixed(options.digit);
    } else {
      target.value = value.toFixed(options.digit);
    }

    variableToSet(parseFloat(target.value));
  };

  const calculate = () => {
    if (shape === 0.5) {
      result = [...calculateArithmetic(speed, first, last)];
      return;
    }

    const ratioMin = (last / first) ** (1 / (speed - 1));
    const ratioMax = 1 / ratioMin;
    const ratio = lerp(ratioMin, ratioMax, shape);
    result = [...calculateGeometric(speed, first, last, ratio)];
  };
</script>

<svelte:head>
  <title>Geargeist - Gearing Calculator for Forza Series</title>
</svelte:head>

<div>
  <label for="speed">Speed</label>
  <select name="speed" bind:value={speed}>
    {#each range(3, 10) as s}
      <option value={s}>{s}</option>
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
    on:blur={(e) =>
      validate(e, { min: 0.48, max: 6, digit: 2 }, (value) => (first = value))}
  />
</div>

<div>
  <label for="last">Last</label>
  <input
    name="last"
    type="number"
    step="0.01"
    bind:value={last}
    on:blur={(e) =>
      validate(e, { min: 0.48, max: 6, digit: 2 }, (value) => (last = value))}
  />
</div>

<div>
  <label for="strength">Strength</label>
  <input
    name="strength"
    type="number"
    step="0.1"
    bind:value={shape}
    on:blur={(e) =>
      validate(e, { min: 0, max: 1, digit: 1 }, (value) => (shape = value))}
  />
</div>

<button on:click={calculate}>Calculate</button>
<div>
  {#each result as gear, i}
    <div>{i + 1}: {gear.toFixed(2)}</div>
  {/each}
</div>
