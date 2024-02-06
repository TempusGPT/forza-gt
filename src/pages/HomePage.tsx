import { Index, Show } from "solid-js";
import GearInput from "~/components/GearInput";
import Dropdown, { DropdownOption } from "~/components/Dropdown";
import { tuneGearing } from "~/libs/tuner";
import { Delegate } from "~/libs/delegate";
import { createSignal } from "~/libs/primitive";

const Config = {
    min: 0.48,
    max: 6,
} as const;

const LengthOptions: DropdownOption<number>[] = [
    { name: "Shortest", value: 0.2 },
    { name: "Shorter", value: 0.3 },
    { name: "Short", value: 0.4 },
    { name: "Medium", value: 0.5 },
    { name: "Long", value: 0.6 },
    { name: "Longer", value: 0.7 },
    { name: "Longest", value: 0.8 },
] as const;

const TransOptions: DropdownOption<number>[] = [
    { name: "3 Speed", value: 3 },
    { name: "4 Speed", value: 4 },
    { name: "5 Speed", value: 5 },
    { name: "6 Speed", value: 6 },
    { name: "7 Speed", value: 7 },
    { name: "8 Speed", value: 8 },
    { name: "9 Speed", value: 9 },
    { name: "10 Speed", value: 10 },
] as const;

export default () => {
    const length = createSignal(LengthOptions[3].value);
    const trans = createSignal(TransOptions[3].value);
    const launchGear = createSignal(NaN);
    const finalGear = createSignal(NaN);
    const calculation = createSignal([] as number[]);
    const validation = new Delegate();

    const handleClick = (launchGearPos: number) => {
        validation.invoke();
        if (isNaN(launchGear.get()) || isNaN(finalGear.get())) {
            return;
        }

        const minFactor = (finalGear.get() / launchGear.get()) ** (1 / (trans.get() - 1));
        const lengthFactor = Math.expLerp(minFactor, 1 / minFactor, length.get());
        calculation.set(
            tuneGearing(lengthFactor, trans.get(), launchGearPos, launchGear.get(), finalGear.get())
        );
    };

    return (
        <main class="container">
            <div class="headings">
                <h1>Forza #1 Gearing Tuner</h1>
                <h1>Designed to tune gears between first and last gears</h1>
            </div>

            <div class="grid">
                <Dropdown
                    label="Length"
                    options={LengthOptions}
                    value={length.get()}
                    onChange={length.set}
                />

                <Dropdown
                    label="Transmission"
                    options={TransOptions}
                    value={trans.get()}
                    onChange={trans.set}
                />

                <GearInput
                    label="Launch Gear"
                    min={Config.min}
                    max={Config.max}
                    onChange={launchGear.set}
                    validation={validation}
                />

                <GearInput
                    label="Final Gear"
                    min={Config.min}
                    max={Config.max}
                    onChange={finalGear.set}
                    validation={validation}
                />
            </div>

            <div class="grid">
                <button onClick={() => handleClick(1)}>Tune first gear launch</button>
                <button onClick={() => handleClick(2)}>Tune second gear launch</button>
            </div>

            <Index each={calculation.get()}>
                {(gear, i) => (
                    <>
                        <Show when={i !== 0}>
                            <hr />
                        </Show>
                        <nav>
                            <div>Gear {i + 1}</div>
                            <Show
                                when={Config.min <= gear() && gear() <= Config.max}
                                fallback="Failed"
                            >
                                {gear().toFixed(2)}
                            </Show>
                        </nav>
                    </>
                )}
            </Index>
        </main>
    );
};
