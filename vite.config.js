import { svelte } from "@sveltejs/vite-plugin-svelte";

/** @type {import("vite").UserConfig} */
export default {
    plugins: [svelte()],
    root: "app",
    build: {
        outDir: "../dist",
    },
};
