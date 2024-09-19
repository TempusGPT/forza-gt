<script lang="ts" module>
    import { useTranslation } from "@libs/translation";

    type Props = {
        label: string;
        placeholder?: string;
        min?: number;
        max?: number;
        value?: number;
    };

    const minValue = 0.48;
    const maxValue = 6;
    const t = useTranslation("GearInput");

    export function isGearValid(gear: number) {
        return minValue <= gear && gear <= maxValue;
    }
</script>

<script lang="ts">
    let {
        label,
        placeholder,
        min = minValue,
        max = maxValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        value = $bindable(),
    }: Props = $props();

    let input = $state("");
    let message = $state<string>();
    let element: HTMLInputElement;

    function whenDefault() {
        value = undefined;
        message = undefined;
    }

    function whenValid(gearing: number) {
        value = gearing;
        message = undefined;
    }

    function whenInvalid(cause: string) {
        value = undefined;
        message = cause;
    }

    export function validateNotEmpty() {
        if (input === "") {
            return whenInvalid(t.emptyError);
        }
    }

    export function format() {
        if (value) {
            input = value.toFixed(2);
        }
    }

    $effect(() => {
        if (input === "") {
            return whenDefault();
        }

        const gearing = Math.round(+input * 100) / 100;
        if (isNaN(gearing)) {
            return whenInvalid(t.typeError);
        }

        if (gearing < min || gearing > max) {
            return whenInvalid(t.rangeError(min.toFixed(2), max.toFixed(2)));
        }

        whenValid(gearing);
        if (document.activeElement !== element) {
            format();
        }
    });
</script>

<label>
    <div>
        {label}
    </div>

    <input
        {placeholder}
        inputmode="decimal"
        onchange={format}
        aria-invalid={message ? true : undefined}
        bind:value={input}
        bind:this={element}
    />

    {#if message}
        <small>{message}</small>
    {/if}
</label>
