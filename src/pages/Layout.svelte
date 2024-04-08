<script lang="ts" context="module">
    import type { Children } from "~/libs/children";

    export type LayoutProps = {
        url: string;  
        children?: Children;
    };
</script>

<script lang="ts">
    const { url, children }: LayoutProps = $props();
</script>

<nav class="container-fluid">
    <ul />
    <ul>
        <li>
            <a href={url}>Source Code</a>
        </li>
    </ul>
</nav>

{#if children}
    {@render children()}
{/if}
