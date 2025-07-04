<script lang="ts">
    import { Slider as SliderPrimitive } from "bits-ui";
    import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

    type Props = {
        ticks?: {
            index: number;
            label: string;
        }[];
    };

    let {
        ref = $bindable(null),
        value = $bindable(),
        orientation = "horizontal",
        class: className,
        ticks = [],
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
        ticks.length > 0 && orientation === "horizontal" && "pb-[21px]",
        className,
    )}
    {...restProps}
>
    {#snippet children({ thumbs })}
        <span
            data-orientation={orientation}
            data-slot="slider-track"
            class={cn(
                "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            )}
        ></span>

        <!-- Custom tick implementation to avoid hydration issues -->
        <div class="absolute inset-x-1.5 flex justify-between">
            {#each ticks as { index, label } (index)}
                <div class="bg-muted-foreground relative size-1 rounded-full">
                    <span
                        class="text-muted-foreground absolute top-2.5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
                    >
                        {label}
                    </span>
                </div>
            {/each}
        </div>

        {#each thumbs as thumb (thumb)}
            <SliderPrimitive.Thumb
                index={thumb}
                data-slot="slider-thumb"
                class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            />
        {/each}
    {/snippet}
</SliderPrimitive.Root>
