import * as en from "./resource.en";
import * as ko from "./resource.ko";

class Translation {
    public readonly homePage = $derived(this.translation.homePage);
    public readonly gearInput = $derived(this.translation.gearInput);
    private language = $state(navigator.language);

    public constructor() {
        addEventListener("languagechange", () => (this.language = navigator.language));
    }

    private get translation() {
        if (this.language.startsWith("ko")) {
            return ko;
        } else {
            return en;
        }
    }
}

export const translation = new Translation();
