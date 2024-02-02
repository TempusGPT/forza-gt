import { render } from "solid-js/web";
import HomePage from "~/pages/HomePage";
import "~/assets/pico.min.css";

document.title = "Forza #1 Gearing Tuner";
render(() => <HomePage />, document.getElementById("app")!);
