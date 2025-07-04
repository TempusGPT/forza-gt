<script lang="ts">
    import GearingGraph from "$lib/gearing/gearing-graph.svelte";
    import { m } from "$lib/paraglide/messages";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/ui/card";
    import { Label } from "$lib/ui/label";
    import { Separator } from "$lib/ui/separator";
    import { Slider } from "$lib/ui/slider";

    type Props = {
        gearing: number[];
    };

    let { gearing }: Props = $props();
    let shiftAt = $state(8000);
</script>

<Card>
    <CardHeader>
        <CardTitle>{m["home.results.title"]()}</CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-6">
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <Label for="shift-at">{m["home.results.shiftAt"]()}</Label>
                <Label for="shift-at" class="text-muted-foreground">
                    {m["home.results.rpm"]({ n: shiftAt })}
                </Label>
            </div>

            <Slider
                id="shift-at"
                type="single"
                min={3000}
                max={13000}
                step={100}
                bind:value={shiftAt}
            />
        </div>

        <GearingGraph {gearing} {shiftAt} />

        <div class="space-y-2">
            {#each gearing as ratio, index (index)}
                {#if index > 0}
                    <Separator />
                {/if}

                <div class="flex justify-between">
                    <span>{m["home.results.gear"]({ n: index + 1 })}</span>
                    <span>{ratio.toFixed(2)}</span>
                </div>
            {/each}
        </div>
    </CardContent>
</Card>
