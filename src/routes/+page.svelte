<script lang="ts">
  import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
  import { lerp } from "$lib/math";

  let speed: number = 6;
  let first: number = 2.89;
  let last: number = 0.78;
  let shape: number = 0.5;
  let result: number[] = [2.89, 1.88, 1.39, 1.1, 0.91, 0.78];

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

<div class="container">
  <h1>Geargeist - Gearing Calculator for Forza Series</h1>

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
        validate(
          e,
          { min: 0.48, max: 6, digit: 2 },
          (value) => (first = value)
        )}
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
    <label for="shape">Shape</label>
    <input
      name="shape"
      type="number"
      step="0.1"
      bind:value={shape}
      on:blur={(e) =>
        validate(e, { min: 0, max: 1, digit: 1 }, (value) => (shape = value))}
    />
  </div>

  <button on:click={calculate}>Calculate</button>
  <div class="result">
    {#each result as gear, i}
      <div class="gear-row">
        <div>Gear {i + 1}</div>
        <div>{gear.toFixed(2)}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    background-color: #f5f5f5;
  }

  .container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
  }

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    appearance: none;
    background-color: #fff;
    outline: none;
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
    padding: 10px;
    border-radius: 6px;
  }

  .gear-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding-bottom: 4px; /* Add padding-bottom */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Add border-bottom */
  }

  .gear-row:last-child {
    border-bottom: none; /* Remove border-bottom from the last gear-row */
  }
</style>
