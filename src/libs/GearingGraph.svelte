<script lang="ts" context="module">
    export type GearingViewProps = {
        gearing: number[];
    };

    function equationOfLine(lhs: paper.Point, rhs: paper.Point) {
        const a = (rhs.y - lhs.y) / (rhs.x - lhs.x);
        const b = lhs.y - a * lhs.x;
        return (x: number) => a * x + b;
    }
</script>

<script lang="ts">
    import paper from "paper";

    let { gearing }: GearingViewProps = $props();
    let canvas: HTMLCanvasElement;

    $effect(() => {
        paper.setup(canvas);
    });

    $effect(() => {
        const rect = canvas.getBoundingClientRect();
        const last = gearing[gearing.length - 1];
        const origin = new paper.Point(0, rect.height);

        let lastX = 0;
        paper.project.clear();
        gearing.forEach(drawGear);

        function drawGear(gear: number) {
            const x = rect.width * (last / gear);
            const to = new paper.Point(x, 0);
            const getY = equationOfLine(origin, to);
            const from = new paper.Point(lastX, getY(lastX));

            const line = new paper.Path.Line(from, to);
            line.strokeColor = new paper.Color("#c2c7d0");
            line.strokeWidth = 2;
            lastX = x;
        }
    });
</script>

<div>
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    div {
        display: flex;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 50%;
    }

    canvas {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>
