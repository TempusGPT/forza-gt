import "~/lib/math";

import { render } from "solid-js/web";
import Layout from "~/app/Layout";
import HomePage from "~/app/HomePage";

const code = () => (
    <Layout version="2.0.0" url="https://github.com/TempusGPT/f1gt">
        <HomePage />
    </Layout>
);

document.title = "Forza #1 Gearing Tuner";
render(code, document.getElementById("app")!);
