import "~/assets/styles.css";
import "~/libs/math";

import { render } from "solid-js/web";
import Layout from "~/pages/Layout";
import HomePage from "~/pages/HomePage";

const app = () => (
    <Layout version="2.0.0" url="https://github.com/TempusGPT/f1gt">
        <HomePage />
    </Layout>
);

document.title = "Forza #1 Gearing Tuner";
render(app, document.getElementById("app")!);
