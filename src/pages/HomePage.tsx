import GearInput from "~/components/GearInput";
import Headings from "~/components/Headings";
import LabeledSelect from "~/components/LabeledSelect";

export default () => {
    const transmissions = [3, 4, 5, 6, 7, 8, 9, 10];
    const lengths = [
        { name: "Shortest", value: 0.2 },
        { name: "Shorter", value: 0.3 },
        { name: "Short", value: 0.4 },
        { name: "Medium", value: 0.5 },
        { name: "Long", value: 0.6 },
        { name: "Longer", value: 0.7 },
        { name: "Longest", value: 0.8 },
    ];

    return (
        <main class="container">
            <Headings
                title="Forza #1 Gearing Tuner"
                subtitle="Designed to tune gears between first and last gears"
            />

            <div class="grid">
                <LabeledSelect
                    label="Transmission"
                    options={transmissions}
                    defaultIndex={3}
                    nameSelector={(t) => `${t} Speed`}
                    valueSelector={(t) => t}
                />

                <GearInput label="First Gear" />
                <GearInput label="Last Gear" />

                <LabeledSelect
                    label="Length"
                    options={lengths}
                    defaultIndex={3}
                    nameSelector={(l) => l.name}
                    valueSelector={(l) => l.value}
                />
            </div>

            <button>Tune</button>
        </main>
    );
};
