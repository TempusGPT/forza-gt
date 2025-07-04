<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import { Button } from "$lib/ui/button";
    import * as DropdownMenu from "$lib/ui/dropdown-menu";
    import { Settings } from "@lucide/svelte";

    let theme = $state("system");
    let language = $state("system");
</script>

<h1 class="scroll-m-20 text-xl font-semibold tracking-tight">{m["home.navigation.title"]()}</h1>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button variant="ghost" size="icon" {...props}>
                <Settings />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>

    <DropdownMenu.Content align="end" class="w-56">
        <DropdownMenu.Label>{m["home.navigation.theme.label"]()}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup bind:value={theme}>
            <DropdownMenu.RadioItem value="system">
                {m["home.navigation.theme.system"]()}
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="light">
                {m["home.navigation.theme.light"]()}
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
                {m["home.navigation.theme.dark"]()}
            </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Separator />

        <DropdownMenu.Label>{m["home.navigation.language.label"]()}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup bind:value={language}>
            <DropdownMenu.RadioItem value="system">
                {m["home.navigation.language.system"]()}
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="en">English</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="ko">한국어</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
</DropdownMenu.Root>
