import { resources, type Translation } from "./resources";

function get(): Translation {
    const language = navigator.language.slice(0, 2);
    return resources[language] ?? resources.default;
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
