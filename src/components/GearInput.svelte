<script lang="ts">
    export let value = "";

    const onBlur = () => {
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            value = floatValue.toFixed(2);
        }
    };
</script>

<input inputmode="numeric" bind:value on:blur={onBlur} />
