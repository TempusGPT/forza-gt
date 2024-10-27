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
    let { label, min, max, step, value = $bindable() }: Props = $props();
</script>

<label>
    <div>{label} ({value})</div>
    <input type="range" {min} {max} {step} bind:value />
</label>
