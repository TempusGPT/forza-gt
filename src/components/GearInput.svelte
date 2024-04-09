<script lang="ts" context="module">
    export type GearInputProps = {
        label: string;
        placeholder?: string;
        value?: number;
    };

    export const isGearValid = (gear: number) => {
        return 0.48 <= gear && gear <= 6;
    };
</script>

<script lang="ts">
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { label, placeholder, value = $bindable(NaN) }: GearInputProps = $props();

    let input = $state("");
    let message = $state("");
    let valid = $state(true);

    const whenValid = (gear: number) => {
        const fixedGear = gear.toFixed(2);
        value = Number(fixedGear);
        input = fixedGear;
        message = "";
        return (valid = true);
    };

    const whenInvalid = (cause: string) => {
        value = NaN;
        message = cause;
        return (valid = false);
    };

    export const validate = () => {
        const formattedInput = input.replaceAll(",", ".").trim();
        if (formattedInput === "") {
            return whenInvalid("Cannot be empty.");
        }

        const gear = Number(formattedInput);
        if (isNaN(gear)) {
            return whenInvalid("Must be a number.");
        }

        if (!isGearValid(gear)) {
            return whenInvalid("Must be between 0.48 and 6.00.");
        }

        return whenValid(gear);
    };
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
