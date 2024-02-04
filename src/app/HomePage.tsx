import { JSX, createSignal } from "solid-js";
import GearInput from "~/component/GearInput";
import Headings from "~/component/Headings";
import Dropdown, { Option } from "~/component/Dropdown";
import { tuneGearing } from "~/lib/tuner";
import { createEvent } from "~/lib/event";

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

export default () => {
    const [transmission, setTransmission] = createSignal(transmissionOptions[3].value);
    const [firstGear, setFirstGear] = createSignal(NaN);
    const [lastGear, setLastGear] = createSignal(NaN);
    const [length, setLength] = createSignal(lengthOptions[3].value);

    const validateEvent = createEvent();

    const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (e) => {
        e.preventDefault();
        validateEvent.dispatch();

        if (isNaN(firstGear()) || isNaN(lastGear())) {
            alert("First and last gears must be numbers");
        } else if (firstGear() <= lastGear()) {
            alert("First gear must be greater than last gear");
        } else {
            const minRatio = (lastGear() / firstGear()) ** (1 / (transmission() - 1));
            const ratio = Math.expLerp(minRatio, 1 / minRatio, length());
            const gearing = tuneGearing(transmission(), firstGear(), lastGear(), ratio);
            console.log(gearing);
        }
    };

    return (
        <main class="container">
            <Headings
                title="Forza #1 Gearing Tuner"
                subtitle="Designed to tune gears between first and last gears"
            />

            <form onSubmit={handleSubmit}>
                <div class="grid">
                    <Dropdown
                        label="Transmission"
                        options={transmissionOptions}
                        value={transmission}
                        setValue={setTransmission}
                    />

                    <GearInput
                        label="First Gear"
                        setValue={setFirstGear}
                        validateEvent={validateEvent}
                    />
                    <GearInput
                        label="Last Gear"
                        setValue={setLastGear}
                        validateEvent={validateEvent}
                    />

                    <Dropdown
                        label="Length"
                        options={lengthOptions}
                        value={length}
                        setValue={setLength}
                    />
                </div>

                <button>Tune</button>
            </form>
        </main>
    );
};
