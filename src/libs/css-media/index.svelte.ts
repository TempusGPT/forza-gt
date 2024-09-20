export type ColorScheme = "light" | "dark";

let colorScheme = $state<ColorScheme>(
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
);

window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => (colorScheme = e.matches ? "light" : "dark"));

export const cssMedia = {
    get colorScheme() {
        return colorScheme;
    },
};
