import { For, JSX, Show } from "solid-js";
import GearInput from "~/component/GearInput";
import Dropdown, { DropdownOption } from "~/component/Dropdown";
import { tuneGearing } from "~/lib/tuner";
import { Delegate } from "~/lib/delegate";
import { createState } from "~/lib/primitive";

const transOptions: DropdownOption<number>[] = [
    { name: "3 Speed", value: 3 },
    { name: "4 Speed", value: 4 },
    { name: "5 Speed", value: 5 },
    { name: "6 Speed", value: 6 },
    { name: "7 Speed", value: 7 },
    { name: "8 Speed", value: 8 },
    { name: "9 Speed", value: 9 },
    { name: "10 Speed", value: 10 },
];

const lengthOptions: DropdownOption<number>[] = [
    { name: "Shortest", value: 0.2 },
    { name: "Shorter", value: 0.3 },
    { name: "Short", value: 0.4 },
    { name: "Medium", value: 0.5 },
    { name: "Long", value: 0.6 },
    { name: "Longer", value: 0.7 },
    { name: "Longest", value: 0.8 },
];

export default () => {
    const gear = createState({
        length: lengthOptions[3].value,
        trans: transOptions[3].value,
        first: NaN,
        last: NaN,
        result: [] as number[],
    });

    const validation = new Delegate();

    const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (e) => {
        e.preventDefault();
        validation.invoke();

        if (!isNaN(gear.first) && !isNaN(gear.last)) {
            const minRatio = (gear.last / gear.first) ** (1 / (gear.trans - 1));
            const ratio = Math.expLerp(minRatio, 1 / minRatio, gear.length);
            gear.result = tuneGearing(gear.trans, gear.first, gear.last, ratio);
        }
    };

    return (
        <main class="container">
            <div class="headings">
                <h1>Forza #1 Gearing Tuner</h1>
                <h1>Designed to tune gears between first and last gears</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div class="grid">
                    <Dropdown
                        label="Length"
                        options={lengthOptions}
                        value={gear.length}
                        onChange={(value) => (gear.length = value)}
                    />

                    <Dropdown
                        label="Transmission"
                        options={transOptions}
                        value={gear.trans}
                        onChange={(value) => (gear.trans = value)}
                    />

                    <GearInput
                        label="First Gear"
                        onChange={(value) => (gear.first = value)}
                        validation={validation}
                    />

                    <GearInput
                        label="Last Gear"
                        onChange={(value) => (gear.last = value)}
                        validation={validation}
                    />
                </div>

                <button>Tune</button>
            </form>

            <For each={gear.result}>
                {(gear, i) => (
                    <>
                        <Show when={i() !== 0}>
                            <hr />
                        </Show>
                        <nav>
                            <div>Gear {i() + 1}</div>
                            <div>{gear.toFixed(2)}</div>
                        </nav>
                    </>
                )}
            </For>
        </main>
    );
};
