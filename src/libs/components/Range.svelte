<script lang="ts" module>
    export type RangePreset = {
        name: string;
        value: number;
    };

    type Props = {
        label: string;
        min?: number;
        max?: number;
        step?: number;
        value?: number;
        presets?: RangePreset[];
    };
</script>

<script lang="ts">
    let {
        label,
        min = 0,
        max = 100,
        step = 1,
        value = $bindable((min + max) / 2),
        presets = [],
    }: Props = $props();

    const presetOptions = $derived(
        presets.map(({ name, value }) => {
            const ratio = (value - min) / (max - min);
            const left = `calc((0% + 0.625rem) * (1 - ${ratio}) + (100% - 0.625rem) * ${ratio})`;
            return { name, left };
        }),
    );
</script>

<label class="range-container">
    {label}

    {#each presetOptions as { left }}
        <div class="preset-marker" style:left></div>
    {/each}

    <input type="range" {min} {max} {step} bind:value />

    <small>
        {#each presetOptions as { name, left }}
            <div class="preset" style:left>{name}</div>
        {/each}
    </small>
</label>

<style>
    .range-container {
        position: relative;
        margin-bottom: calc(var(--pico-spacing) * 1.5);
    }

    .range-container input::-webkit-slider-thumb {
        position: relative;
        z-index: 1;
    }

    .range-container input::-moz-range-thumb {
        position: relative;
        z-index: 1;
    }

    .range-container input::-ms-thumb {
        position: relative;
        z-index: 1;
    }

    .preset-marker {
        position: absolute;
        margin-top: calc(var(--pico-spacing) * 0.25);
        height: 1.25rem;

        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 0.25rem;
            background-color: var(--pico-range-thumb-color);
            transform: translate(-50%, -50%);
        }
    }

    .preset {
        position: absolute;
        white-space: nowrap;
        transform: translateX(-50%);
    }
</style>
