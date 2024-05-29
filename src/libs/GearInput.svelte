<script lang="ts" context="module">
    export type GearInputProps = {
        label: string;
        placeholder?: string;
        value?: number;
    };

    export function isGearValid(gear: number) {
        return 0.48 <= gear && gear <= 6;
    }
</script>

<script lang="ts">
    import { gearInput as intl } from "@libs/intl";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { label, placeholder, value = $bindable(NaN) }: GearInputProps = $props();

    let input = $state("");
    let message = $state("");
    let valid = $state(true);

    export function validate(): boolean {
        const formattedInput = input.replaceAll(",", ".").trim();
        if (formattedInput === "") {
            return whenInvalid(intl.emptyError);
        }

        const gear = Number(formattedInput);
        if (isNaN(gear)) {
            return whenInvalid(intl.typeError);
        }

        if (!isGearValid(gear)) {
            return whenInvalid(intl.rangeError("0.48", "6.00"));
        }

        return whenValid(gear);
    }

    function whenValid(gear: number): boolean {
        const fixedGear = gear.toFixed(2);
        value = Number(fixedGear);
        input = fixedGear;
        message = "";
        valid = true;
        return true;
    }

    function whenInvalid(cause: string): boolean {
        value = NaN;
        message = cause;
        valid = false;
        return false;
    }
</script>

<label>
    {label}
    <input
        {placeholder}
        inputmode="decimal"
        onchange={validate}
        aria-invalid={valid ? undefined : true}
        bind:value={input}
    />
    <small>{message}</small>
</label>
