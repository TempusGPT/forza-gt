import { mount } from "svelte";
import HomePage from "../src/pages/HomePage.svelte";

export default mount(HomePage, { target: document.getElementById("app")! });
