<script lang="ts">
    import type { Children } from "~/libs/children";

    type LayoutProps = {
        url: string;
        children: Children;
    };

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

{@render children()}
