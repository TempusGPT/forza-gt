import "~/libs/math.ext";

import { render } from "solid-js/web";
import Layout from "~/pages/Layout";
import HomePage from "~/pages/HomePage";

const code = () => (
    <Layout version="2.1.2" url="https://github.com/TempusGPT/f1gt">
        <HomePage />
    </Layout>
);

render(code, document.body);
