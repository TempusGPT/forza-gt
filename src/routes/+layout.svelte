<script>
    import { version } from "$app/environment";
</script>

<nav class="container-fluid">
    <ul />
    <ul>
        <li>Version {version}</li>
        <li>•</li>
        <li><a href="https://github.com/TempusGPT/f1gt">Source Code</a></li>
    </ul>
</nav>

<slot />
<svelte:head>
    <title>Forza #1 Gearing Tuner</title>
</svelte:head>
