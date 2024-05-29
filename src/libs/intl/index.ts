import { en } from "./intl.en";
import { ko } from "./intl.ko";

const intl = navigator.language.startsWith("ko") ? ko : en;

export const homePage = intl.homePage;
export const gearInput = intl.gearInput;
