<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import { getLocale, setLocale } from "$lib/paraglide/runtime";
    import { buttonVariants } from "$lib/ui/button";
    import { EllipsisVertical } from "@lucide/svelte";
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

<div class="flex w-full items-center">
    <div class="flex-1"></div>
    <h1 class="scroll-m-20 text-xl font-semibold tracking-tight">{m["home.header.title"]()}</h1>

    <div class="flex flex-1 justify-end">
        <DropdownMenu>
            <DropdownMenuTrigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
                <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" class="w-56">
                <DropdownMenuLabel>{m["home.header.theme.label"]()}</DropdownMenuLabel>

                <DropdownMenuRadioGroup value={mode.current}>
                    <DropdownMenuRadioItem value="light" onclick={() => setMode("light")}>
                        {m["home.header.theme.light"]()}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark" onclick={() => setMode("dark")}>
                        {m["home.header.theme.dark"]()}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>{m["home.header.language"]()}</DropdownMenuLabel>

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
    </div>
</div>
