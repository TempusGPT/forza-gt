<script lang="ts">
    import { tuneGearing } from "$lib/gearing";
    import { expLerp } from "$lib/math";
    import Configs from "./configs.svelte";
    import Footer from "./footer.svelte";
    import Header from "./header.svelte";
    import Results from "./results.svelte";

    let gearing = $state([2.89, 1.99, 1.51, 1.22, 1.03, 0.88, 0.78]);

    function handleTune(
        launchGear: number,
        finalGear: number,
        transmission: number,
        powerBand: number,
    ) {
        const factorMin = (finalGear / launchGear) ** (1 / (transmission - 1));
        const t = 0.5 + (0.3 * powerBand) / 10;
        const factor = expLerp(factorMin, 1 / factorMin, t);

        gearing = tuneGearing(transmission, launchGear, finalGear, factor).map(
            (ratio) => Math.trunc(ratio * 100) / 100,
        );
    }
</script>

<div class="flex min-h-screen flex-col">
    <header class="container mx-auto flex h-14 items-center justify-between px-6">
        <Header />
    </header>

    <main class="container mx-auto flex-1 px-6 py-6">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Configs onTune={handleTune} />
            <Results {gearing} />
        </div>
    </main>

    <footer class="container mx-auto flex h-14 items-center justify-center px-6">
        <Footer />
    </footer>
</div>
