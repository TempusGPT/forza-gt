<script lang="ts">
    import { Slider as SliderPrimitive } from "bits-ui";
    import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

    type Props = {
        labels?: {
            index: number;
            content: string;
        }[];
    };

    let {
        ref = $bindable(null),
        value = $bindable(),
        orientation = "horizontal",
        class: className,
        labels = [],
        ...restProps
    }: WithoutChildrenOrChild<SliderPrimitive.RootProps & Props> = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
    bind:ref
    bind:value={value as never}
    data-slot="slider"
    {orientation}
    class={cn(
        "relative flex w-full touch-none select-none data-[disabled]:opacity-50 data-[orientation=horizontal]:items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        labels.length > 0 && orientation === "horizontal" && "pb-[21px]",
        className,
    )}
    {...restProps}
>
    {#snippet children({ thumbItems })}
        <span
            data-orientation={orientation}
            data-slot="slider-track"
            class={cn(
                "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            )}
        ></span>

        {#each labels as { index, content: label } (index)}
            <SliderPrimitive.Tick
                {index}
                class="bg-muted-foreground flex size-1 justify-center rounded-full"
            >
                <span class="text-muted-foreground mt-2.5 text-xs whitespace-nowrap">
                    {label}
                </span>
            </SliderPrimitive.Tick>
        {/each}

        {#each thumbItems as { index } (index)}
            <SliderPrimitive.Thumb
                {index}
                data-slot="slider-thumb"
                class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            />
        {/each}
    {/snippet}
</SliderPrimitive.Root>
