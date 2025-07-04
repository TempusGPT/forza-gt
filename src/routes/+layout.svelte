<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    import "../app.css";

    let { children } = $props();
</script>

<svelte:head>
    <title>Forza GT</title>
    <meta
        name="description"
        content="Calculate optimal gear ratios for Forza racing games. Fine-tune your transmission settings for maximum performance."
    />
</svelte:head>

<ModeWatcher />
{@render children()}
