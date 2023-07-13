<script>
    import { version } from "$app/environment";
</script>

<nav class="container-fluid">
    <ul>
        <li><a href="/" class="contrast"><b>Alyxer's Gearing Tuner</b></a></li>
    </ul>
    <ul>
        <li>Version {version}</li>
        <li>•</li>
        <li><a href="https://github.com/AlyxerHL/gearing-tuner">Source Code</a></li>
    </ul>
</nav>

<slot />
<svelte:head>
    <title>Alyxer's Gearing Tuner</title>
</svelte:head>
