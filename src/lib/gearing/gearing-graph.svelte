<script lang="ts">
    type Point = {
        x: number;
        y: number;
    };

    type Props = {
        gearing: number[];
        shiftAt?: number;
        width?: number;
        height?: number;
        strokeWidth?: number;
    };

    let { gearing, shiftAt, width = 400, height = 200, strokeWidth = 2 }: Props = $props();

    const origin = { x: 0, y: height };
    const points = $derived(
        gearing.map((gear) => ({ x: width * (gearing[gearing.length - 1] / gear), y: 0 })),
    );

    const segments = $derived(
        points.map((point, index) => {
            const x1 = index === 0 ? 0 : points[index - 1].x;
            const calculateY = equationOfLine(origin, point);
            return { x1, y1: calculateY(x1), x2: point.x, y2: point.y };
        }),
    );

    const rpmAfterShift = $derived(
        shiftAt
            ? gearing.slice(1).map((gear, index) => ({
                  rpm: Math.round(shiftAt * (gear / gearing[index])),
                  x: segments[index + 1].x1,
                  y: segments[index + 1].y1,
              }))
            : [],
    );

    function equationOfLine(lhs: Point, rhs: Point): (x: number) => number {
        const a = (rhs.y - lhs.y) / (rhs.x - lhs.x);
        const b = lhs.y - a * lhs.x;
        return (x) => a * x + b;
    }
</script>

<div class="relative">
    <svg
        viewBox={`-${strokeWidth / 2} -${strokeWidth / 2} ${width + strokeWidth} ${height + strokeWidth}`}
    >
        {#each segments as { x1, y1, x2, y2 }, index (index)}
            <line
                {x1}
                {y1}
                {x2}
                {y2}
                stroke="currentColor"
                stroke-width={strokeWidth}
                stroke-linecap="round"
                class="text-primary"
            />
        {/each}
    </svg>

    {#each rpmAfterShift as { rpm, x, y }, index (index)}
        <span
            class="text-muted-foreground absolute mt-1.5 -translate-x-1/2 text-xs"
            style:left="{(x / width) * 100}%"
            style:top="{(y / height) * 100}%"
        >
            {rpm}
        </span>
    {/each}
</div>
