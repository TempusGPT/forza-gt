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
    let valid = $state(true);

    const whenValid = (gear: number) => {
        const fixedGear = gear.toFixed(2);
        value = Number(fixedGear);
        input = fixedGear;
        return (valid = true);
    };

    const whenInvalid = () => {
        value = NaN;
        return (valid = false);
    };

    export const validate = () => {
        const formattedInput = input.replaceAll(",", ".").trim();
        if (formattedInput === "") {
            return whenInvalid();
        }

        const gear = Number(formattedInput);
        return isGearValid(gear) ? whenValid(gear) : whenInvalid();
    };
</script>

<label>
    <div>{label}</div>
    <input
        {placeholder}
        inputmode="decimal"
        onchange={validate}
        aria-invalid={valid ? undefined : true}
        bind:value={input}
    />
</label>
