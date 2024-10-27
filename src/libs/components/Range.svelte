<script lang="ts" module>
    type Props = {
        label: string;
        min?: number;
        max?: number;
        step?: number;
        value?: number;
    };
</script>

<script lang="ts">
    let {
        label,
        min = 0,
        max = 100,
        step = 1,
        value = $bindable((min + max) / 2),
    }: Props = $props();

    $effect(() => {
        document.documentElement.style.setProperty(
            "--range-value-position",
            ((value - min) / (max - min)).toString(),
        );
    });
</script>

<label class="range-container">
    {label}
    <input type="range" {min} {max} {step} bind:value />
    <small class="value">{value}</small>
</label>

<style>
    .range-container {
        position: relative;
        margin-bottom: calc(var(--pico-spacing) * 1.5);
    }

    .value {
        position: absolute;
        transform: translateX(-50%);
        max-width: max-content;

        left: calc(
            (0% + 0.625rem) * (1 - var(--range-value-position)) + (100% - 0.625rem) *
                var(--range-value-position)
        );
    }
</style>
