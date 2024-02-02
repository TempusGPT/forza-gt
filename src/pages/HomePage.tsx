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
        <>
            <nav class="container-fluid">
                <ul />
                <ul>
                    <li>Version 2.0.0</li>
                    <li>•</li>
                    <li>
                        <a href="https://github.com/TempusGPT/f1gt">Source Code</a>
                    </li>
                </ul>
            </nav>

            <main class="container">
                <div class="headings">
                    <h1>Forza #1 Gearing Tuner</h1>
                    <h1>Designed to tune gears between first and last gears</h1>
                </div>

                <form method="post">
                    <div class="grid">
                        <LabeledSelect
                            label="Transmission"
                            options={transmissions}
                            nameSelector={(t) => `${t} Speed`}
                            valueSelector={(t) => t}
                        />

                        <label>
                            First Gear
                            <input name="first-gear" placeholder="2.89" inputmode="numeric" />
                        </label>

                        <label>
                            Last Gear
                            <input name="last-gear" placeholder="0.78" inputmode="numeric" />
                        </label>

                        <LabeledSelect
                            label="Length"
                            options={lengths}
                            nameSelector={(t) => t.name}
                            valueSelector={(t) => t.value}
                        />
                    </div>

                    <button>Tune</button>
                </form>
            </main>
        </>
    );
};
