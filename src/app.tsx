import { render } from "solid-js/web";
import HomePage from "./pages/HomePage";

document.title = "SolidJS Starter";
render(() => <HomePage />, document.getElementById("app")!);
