import { createSignal } from "solid-js";
import GearInput from "~/components/GearInput";
import Headings from "~/components/Headings";
import LabeledSelect, { Option } from "~/components/LabeledSelect";

export default () => {
    const transmissionOptions: Option[] = [
        { name: "3 Speed", value: 3 },
        { name: "4 Speed", value: 4 },
        { name: "5 Speed", value: 5 },
        { name: "6 Speed", value: 6 },
        { name: "7 Speed", value: 7 },
        { name: "8 Speed", value: 8 },
        { name: "9 Speed", value: 9 },
        { name: "10 Speed", value: 10 },
    ];

    const lengthOptions: Option[] = [
        { name: "Shortest", value: 0.2 },
        { name: "Shorter", value: 0.3 },
        { name: "Short", value: 0.4 },
        { name: "Medium", value: 0.5 },
        { name: "Long", value: 0.6 },
        { name: "Longer", value: 0.7 },
        { name: "Longest", value: 0.8 },
    ];

    const [transmission, setTransmission] = createSignal(transmissionOptions[3].value);
    // const [firstGear, setFirstGear] = createSignal("");
    // const [lastGear, setLastGear] = createSignal("");
    const [length, setLength] = createSignal(lengthOptions[3].value);

    return (
        <main class="container">
            <Headings
                title="Forza #1 Gearing Tuner"
                subtitle="Designed to tune gears between first and last gears"
            />

            <div class="grid">
                <LabeledSelect
                    label="Transmission"
                    options={transmissionOptions}
                    value={transmission}
                    setValue={setTransmission}
                />

                <GearInput label="First Gear" />
                <GearInput label="Last Gear" />

                <LabeledSelect
                    label="Length"
                    options={lengthOptions}
                    value={length}
                    setValue={setLength}
                />
            </div>

            <button>Tune</button>
        </main>
    );
};
