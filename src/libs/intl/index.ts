import { en } from "./intl.en";
import { ko } from "./intl.ko";

export const { homePage, gearInput } = navigator.language.startsWith("ko") ? ko : en;
