<script lang="ts" context="module">
    const MIN = 0.48;
    const MAX = 6;
    const placeholder = `${MIN.toFixed(2)}-${MAX.toFixed(2)}`;

    export const isGearValid = (gear: number) => {
        return MIN <= gear && gear <= MAX;
    };

    export type GearInputRef = {
        validate: () => boolean;
    };

    export type GearInputProps = {
        label: string;
        onChange?: (value: number) => void;
    };
</script>

<script lang="ts">
    const { label, onChange }: GearInputProps = $props();

    let input = $state("");
    let valid = $state(true);

    const whenValid = (gear: number) => {
        const formatted = gear.toFixed(2);
        onChange?.(Number(formatted));
        input = formatted;
        valid = true;
        return true;
    };

    const whenInvalid = () => {
        onChange?.(NaN);
        valid = false;
        return false;
    };

    export const validate = () => {
        const trimmed = input.trim();
        if (trimmed === "") {
            return whenInvalid();
        }

        const gear = Number(trimmed.replaceAll(",", "."));
        return isGearValid(gear) ? whenValid(gear) : whenInvalid();
    };
</script>

<label>
    <div>{label}</div>
    <input
        bind:value={input}
        {placeholder}
        inputmode="decimal"
        onchange={validate}
        aria-invalid={valid ? undefined : true}
    />
</label>
