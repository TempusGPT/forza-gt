<script lang="ts">
    import { useGearingInput } from "$lib/gearing";
    import { Button } from "$lib/ui/button";
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/ui/card";
    import { Input } from "$lib/ui/input";
    import { Label } from "$lib/ui/label";
    import { LabeledSlider } from "$lib/ui/labeled-slider";
    import { Select, SelectContent, SelectItem, SelectTrigger } from "$lib/ui/select";
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
        { value: "3", label: "home.configs.transmission.speed" },
        { value: "4", label: "home.configs.transmission.speed" },
        { value: "5", label: "home.configs.transmission.speed" },
        { value: "6", label: "home.configs.transmission.speed" },
        { value: "7", label: "home.configs.transmission.speed" },
        { value: "8", label: "home.configs.transmission.speed" },
        { value: "9", label: "home.configs.transmission.speed" },
        { value: "10", label: "home.configs.transmission.speed" },
    ];

    const powerBandLabels = [
        { index: 0, value: -10, content: "home.configs.powerBand.narrow" },
        { index: 5, value: -5, content: "home.configs.powerBand.bitNarrow" },
        { index: 10, value: 0, content: "home.configs.powerBand.moderate" },
        { index: 15, value: 5, content: "home.configs.powerBand.bitWide" },
        { index: 20, value: 10, content: "home.configs.powerBand.wide" },
    ];

    let { onTune }: Props = $props();
    const { launchGear, finalGear } = useGearingInput(0.48, 6);
    let transmission = $state(transmissionOptions[4].value);
    let powerBand = $state(powerBandLabels[2].value);

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
        <CardTitle>home.configs.title</CardTitle>
    </CardHeader>

    <CardContent>
        <form id="configs" onsubmit={handleSubmit} class="flex flex-col gap-6">
            <div class="space-y-2">
                <Label for="launch-gear" class="flex justify-between">
                    <span>home.configs.launchGear</span>
                    {#if launchGear.error}
                        <span class="text-destructive">{launchGear.error}</span>
                    {/if}
                </Label>

                <Input id="launch-gear" type="text" placeholder="2.89" {...launchGear.props} />
            </div>

            <div class="space-y-2">
                <Label for="final-gear" class="flex justify-between">
                    <span>home.configs.finalGear</span>
                    {#if finalGear.error}
                        <span class="text-destructive">{finalGear.error}</span>
                    {/if}
                </Label>

                <Input id="final-gear" type="text" placeholder="0.78" {...finalGear.props} />
            </div>

            <div class="space-y-2">
                <Label for="transmission">home.configs.transmissionabel</Label>

                <Select type="single" bind:value={transmission}>
                    <SelectTrigger id="transmission" class="w-full">
                        home.configs.transmission.speed
                    </SelectTrigger>

                    <SelectContent>
                        {#each transmissionOptions as { value, label } (value)}
                            <SelectItem value={value.toString()}>{label}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
            </div>

            <div class="space-y-2">
                <Label for="power-band">home.configs.powerBand.label</Label>

                <LabeledSlider
                    type="single"
                    id="power-band"
                    min={-10}
                    max={10}
                    bind:value={powerBand}
                    labels={powerBandLabels}
                />
            </div>
        </form>
    </CardContent>

    <CardFooter>
        <Button type="submit" form="configs" class="w-full">home.configs.tune</Button>
    </CardFooter>
</Card>
