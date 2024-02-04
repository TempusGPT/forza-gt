import { render } from "solid-js/web";
import Header from "~/components/Header";
import HomePage from "~/pages/HomePage";
import "~/assets/styles.css";
import "~/libs/math";

const app = () => (
    <>
        <Header version="2.0.0" url="https://github.com/TempusGPT/f1gt" />
        <HomePage />
    </>
);

document.title = "Forza #1 Gearing Tuner";
render(app, document.getElementById("app")!);
