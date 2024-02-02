import { type Component, For } from "solid-js";

const HomePage: Component = () => {
    const transmissions = [3, 4, 5, 6, 7, 8, 9, 10] as const;
    const lengths = [
        { name: "Shortest", value: 0.2 },
        { name: "Shorter", value: 0.3 },
        { name: "Short", value: 0.4 },
        { name: "Medium", value: 0.5 },
        { name: "Long", value: 0.6 },
        { name: "Longer", value: 0.7 },
        { name: "Longest", value: 0.8 },
    ] as const;

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
                        <label>
                            Transmission
                            <select name="transmission">
                                <For each={transmissions}>
                                    {(t) => <option value={t}>{t} Speed</option>}
                                </For>
                            </select>
                        </label>

                        <label>
                            First Gear
                            <input name="first-gear" placeholder="2.89" inputmode="numeric" />
                        </label>

                        <label>
                            Last Gear
                            <input name="last-gear" placeholder="0.78" inputmode="numeric" />
                        </label>

                        <label>
                            Length
                            <select name="length">
                                <For each={lengths}>
                                    {(l) => <option value={l.value}>{l.name}</option>}
                                </For>
                            </select>
                        </label>
                    </div>

                    <button>Tune</button>
                </form>
            </main>
        </>
    );
};

export default HomePage;
