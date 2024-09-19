import type { Translation } from "./types";
import { en } from "./resources/en";
import { ko } from "./resources/ko";

function get() {
    if (navigator.language.startsWith("ko")) {
        return ko;
    } else {
        return en;
    }
}

let translation = $state(get());
window.addEventListener("languagechange", () => (translation = get()));

export function useTranslation<T extends keyof Translation>(component: T): Translation[T] {
    return new Proxy({} as Translation[T], {
        get(_, name: string) {
            return translation[component][name as keyof Translation[T]];
        },
    });
}
