<script lang="ts" context="module">
    type Props = {
        gearing: number[];
    };

    type Point = {
        x: number;
        y: number;
    };

    function equationOfLine(lhs: Point, rhs: Point) {
        const a = (rhs.y - lhs.y) / (rhs.x - lhs.x);
        const b = lhs.y - a * lhs.x;
        return (x: number) => a * x + b;
    }
</script>

<script lang="ts">
    let { gearing }: Props = $props();

    let canvas: HTMLCanvasElement;
    let darkMode = $state(window.matchMedia("(prefers-color-scheme: dark)").matches);

    $effect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => (darkMode = e.matches));
    });

    $effect(() => {
        let lastX = 0;
        const context = canvas.getContext("2d")!;
        const origin = { x: 0, y: canvas.height };
        const last = gearing[gearing.length - 1];

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        gearing.forEach(drawGear);

        function drawGear(gear: number) {
            const x = canvas.width * (last / gear);
            const point = { x, y: 0 };
            context.moveTo(point.x, point.y);

            const getY = equationOfLine(origin, point);
            context.lineTo(lastX, getY(lastX));

            context.strokeStyle = darkMode ? "#c2c7d0" : "#373c44";
            context.lineWidth = 4;
            context.stroke();
            lastX = x;
        }
    });
</script>

<div class="graph-container">
    <canvas class="graph" width="1024" height="512" bind:this={canvas}></canvas>
</div>

<style>
    .graph-container {
        display: flex;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 50%;
    }

    .graph {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>
