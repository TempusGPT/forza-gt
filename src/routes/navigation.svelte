<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import { getLocale, setLocale } from "$lib/paraglide/runtime";
    import { buttonVariants } from "$lib/ui/button";
    import * as DropdownMenu from "$lib/ui/dropdown-menu";
    import { Settings } from "@lucide/svelte";
    import { mode, setMode } from "mode-watcher";
</script>

<h1 class="scroll-m-20 text-xl font-semibold tracking-tight">{m["home.navigation.title"]()}</h1>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
        <Settings />
    </DropdownMenu.Trigger>

    <DropdownMenu.Content align="end" class="w-56">
        <DropdownMenu.Label>{m["home.navigation.theme.label"]()}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup value={mode.current}>
            <DropdownMenu.RadioItem value="light" onclick={() => setMode("light")}>
                {m["home.navigation.theme.light"]()}
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark" onclick={() => setMode("dark")}>
                {m["home.navigation.theme.dark"]()}
            </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator />

        <DropdownMenu.Label>{m["home.navigation.language"]()}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup value={getLocale()}>
            <DropdownMenu.RadioItem value="en" onclick={() => setLocale("en")}>
                English
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="ko" onclick={() => setLocale("ko")}>
                한국어
            </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
</DropdownMenu.Root>
