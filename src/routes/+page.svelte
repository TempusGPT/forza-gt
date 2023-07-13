<script lang="ts">
    import { enhance, type SubmitFunction } from "$app/forms";
    import { page } from "$app/stores";
    export let data;
    export let form;

    let transmission = data.form.transmission.default;
    let firstGear = data.form.firstGear.default;
    let lastGear = data.form.lastGear.default;
    let length = data.form.length.default;

    $: formattedFirstGear = formatGear(firstGear);
    $: formattedLastGear = formatGear(lastGear);

    const formatGear = (value: string) => {
        const floatValue = parseFloat(value);
        return isNaN(floatValue) ? value : floatValue.toFixed(2);
    };

    const useEnhance: SubmitFunction = () => {
        return ({ update }) => update({ reset: false });
    };
</script>

<main class="container">
    <form method="post" use:enhance={useEnhance}>
        <div class="grid">
            <label>
                {data.form.transmission.name}
                <select name={data.form.transmission.name} bind:value={transmission}>
                    {#each data.form.transmission.options as value}
                        <option {value}>{value} Speed</option>
                    {/each}
                </select>
            </label>

            <label>
                {data.form.firstGear.name}
                <input
                    name={data.form.firstGear.name}
                    placeholder={data.form.firstGear.placeholder}
                    inputmode="numeric"
                    bind:value={firstGear}
                    on:blur={() => (firstGear = formattedFirstGear)}
                />
            </label>

            <label>
                {data.form.lastGear.name}
                <input
                    name={data.form.lastGear.name}
                    placeholder={data.form.lastGear.placeholder}
                    inputmode="numeric"
                    bind:value={lastGear}
                    on:blur={() => (lastGear = formattedLastGear)}
                />
            </label>

            <label>
                {data.form.length.name}
                <select name={data.form.length.name} bind:value={length}>
                    {#each data.form.length.options as { name, value }}
                        <option {value}>{name}</option>
                    {/each}
                </select>
            </label>
        </div>

        <button>Tune</button>
    </form>

    {#if form?.result}
        {#each form.result as gear, i}
            {#if i !== 0}
                <hr />
            {/if}
            <nav>
                <div>Gear {i + 1}</div>
                <div>{gear.toFixed(2)}</div>
            </nav>
        {/each}
    {/if}
</main>

{#if form?.error}
    <dialog open>
        <article>
            <header>
                <a href={$page.url.pathname} class="close" aria-label="close" />
                Error
            </header>
            <p>{form.error}</p>
        </article>
    </dialog>
{/if}
