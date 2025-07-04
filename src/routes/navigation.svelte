<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import { getLocale, setLocale } from "$lib/paraglide/runtime";
    import { buttonVariants } from "$lib/ui/button";
    import { Settings } from "@lucide/svelte";
    import { mode, setMode } from "mode-watcher";

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuLabel,
        DropdownMenuRadioGroup,
        DropdownMenuRadioItem,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from "$lib/ui/dropdown-menu";
</script>

<h1 class="scroll-m-20 text-xl font-semibold tracking-tight">{m["home.navigation.title"]()}</h1>

<DropdownMenu>
    <DropdownMenuTrigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
        <Settings />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-56">
        <DropdownMenuLabel>{m["home.navigation.theme.label"]()}</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={mode.current}>
            <DropdownMenuRadioItem value="light" onclick={() => setMode("light")}>
                {m["home.navigation.theme.light"]()}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" onclick={() => setMode("dark")}>
                {m["home.navigation.theme.dark"]()}
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>{m["home.navigation.language"]()}</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={getLocale()}>
            <DropdownMenuRadioItem value="en" onclick={() => setLocale("en")}>
                English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ko" onclick={() => setLocale("ko")}>
                한국어
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
    </DropdownMenuContent>
</DropdownMenu>
