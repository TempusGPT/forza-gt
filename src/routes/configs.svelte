<script lang="ts">
    import { useGearingInput } from "$lib/gearing";
    import { m } from "$lib/paraglide/messages";
    import { Button } from "$lib/ui/button";
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/ui/card";
    import { Input } from "$lib/ui/input";
    import { Label } from "$lib/ui/label";
    import { Select, SelectContent, SelectItem, SelectTrigger } from "$lib/ui/select";
    import { TickSlider } from "$lib/ui/tick-slider";
    import type { EventHandler } from "svelte/elements";

    type Props = {
        onTune: (
            launchGear: number,
            finalGear: number,
            transmission: number,
            powerBand: number,
        ) => void;
    };

    const transmissionOptions = [
        { value: "3", label: m["home.configs.transmission.speed"]({ n: 3 }) },
        { value: "4", label: m["home.configs.transmission.speed"]({ n: 4 }) },
        { value: "5", label: m["home.configs.transmission.speed"]({ n: 5 }) },
        { value: "6", label: m["home.configs.transmission.speed"]({ n: 6 }) },
        { value: "7", label: m["home.configs.transmission.speed"]({ n: 7 }) },
        { value: "8", label: m["home.configs.transmission.speed"]({ n: 8 }) },
        { value: "9", label: m["home.configs.transmission.speed"]({ n: 9 }) },
        { value: "10", label: m["home.configs.transmission.speed"]({ n: 10 }) },
    ];

    const powerBandTicks = [
        { index: 0, label: m["home.configs.powerBand.narrow"]() },
        { index: 5, label: m["home.configs.powerBand.bitNarrow"]() },
        { index: 10, label: m["home.configs.powerBand.moderate"]() },
        { index: 15, label: m["home.configs.powerBand.bitWide"]() },
        { index: 20, label: m["home.configs.powerBand.wide"]() },
    ];

    let { onTune }: Props = $props();
    let powerBand = $state(0);
    let transmission = $state(transmissionOptions[4].value);
    const { launchGear, finalGear } = useGearingInput(0.48, 6);

    const handleSubmit: EventHandler<SubmitEvent> = (e) => {
        e.preventDefault();

        const isLaunchGearValid = launchGear.validate();
        const isFinalGearValid = finalGear.validate();
        launchGear.format();
        finalGear.format();

        if (isLaunchGearValid && isFinalGearValid) {
            onTune(launchGear.value, finalGear.value, Number(transmission), powerBand);
        }
    };
</script>

<Card>
    <CardHeader>
        <CardTitle>{m["home.configs.title"]()}</CardTitle>
    </CardHeader>

    <CardContent>
        <form id="configs" onsubmit={handleSubmit} class="flex flex-col gap-6">
            <div class="space-y-2">
                <Label for="launch-gear" class="flex justify-between">
                    <span>{m["home.configs.launchGear"]()}</span>

                    {#if launchGear.error}
                        <span class="text-destructive">{launchGear.error}</span>
                    {/if}
                </Label>

                <Input id="launch-gear" type="text" placeholder="2.89" {...launchGear.props} />
            </div>

            <div class="space-y-2">
                <Label for="final-gear" class="flex justify-between">
                    <span>{m["home.configs.finalGear"]()}</span>

                    {#if finalGear.error}
                        <span class="text-destructive">{finalGear.error}</span>
                    {/if}
                </Label>

                <Input id="final-gear" type="text" placeholder="0.78" {...finalGear.props} />
            </div>

            <div class="space-y-2">
                <Label for="transmission">{m["home.configs.transmission.label"]()}</Label>

                <Select type="single" bind:value={transmission}>
                    <SelectTrigger id="transmission" class="w-full">
                        {m["home.configs.transmission.speed"]({ n: transmission })}
                    </SelectTrigger>

                    <SelectContent>
                        {#each transmissionOptions as { value, label } (value)}
                            <SelectItem {value}>{label}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
            </div>

            <div class="space-y-2">
                <Label for="power-band">{m["home.configs.powerBand.label"]()}</Label>

                <TickSlider
                    type="single"
                    id="power-band"
                    min={-10}
                    max={10}
                    ticks={powerBandTicks}
                    bind:value={powerBand}
                />
            </div>
        </form>
    </CardContent>

    <CardFooter>
        <Button type="submit" form="configs" class="w-full">{m["home.configs.tune"]()}</Button>
    </CardFooter>
</Card>
