<script lang="ts">
  import { calculateArithmetic, calculateGeometric } from "$lib/calculator";
  import { lerp } from "$lib/math";

  const lengthMap = {
    Shortest: 0 / 12,
    Shorter: 1 / 12,
    Short: 3 / 12,
    Default: 6 / 12,
    Long: 7 / 12,
    Longer: 9 / 12,
    Longest: 12 / 12,
  } as const;
  type Length = keyof typeof lengthMap;

  let speed: number = 6;
  let first: number = 2.89;
  let last: number = 0.78;
  let length: Length = "Default";
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
    if (length === "Default") {
      result = [...calculateArithmetic(speed, first, last)];
      return;
    }

    const ratioMin = (last / first) ** (1 / (speed - 1));
    const ratioMax = 1 / ratioMin;
    const ratio = lerp(ratioMin, ratioMax, lengthMap[length]);
    result = [...calculateGeometric(speed, first, last, ratio)];
  };
</script>

<svelte:head>
  <title>Geargeist - Gearing Calculator for Forza Series</title>
</svelte:head>

<div class="container">
  <h1>Geargeist</h1>
  <h2>Gearing Calculator for Forza Series</h2>

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
    <label for="length">Length</label>
    <select name="length" bind:value={length}>
      {#each Object.keys(lengthMap) as length}
        <option value={length}>{length}</option>
      {/each}
    </select>
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

  .gear-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .gear-row:last-child {
    border-bottom: none;
  }
</style>
