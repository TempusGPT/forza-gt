import "~/libs/math.x";

import { mount } from "svelte";
import HomePage from "~/pages/HomePage.svelte";

export default mount(HomePage, { target: document.getElementById("root")! });
