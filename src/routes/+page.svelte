<script lang="ts">
    import Footer from "./footer.svelte";
    import Navigation from "./navigation.svelte";
</script>

<div class="flex min-h-screen flex-col">
    <nav class="container mx-auto flex h-14 items-center justify-between px-6">
        <Navigation />
    </nav>

    <footer class="container mx-auto flex h-14 items-center justify-center px-6">
        <Footer />
    </footer>
</div>
