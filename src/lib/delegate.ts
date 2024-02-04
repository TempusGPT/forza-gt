import { onCleanup } from "solid-js";

export class Delegate<T = void> {
    private functions = new Set<(arg: T) => void>();

    public constructor() {
        onCleanup(() => this.functions.clear());
    }

    public invoke(arg: T) {
        this.functions.forEach((fn) => fn(arg));
    }

    public add(fn: (arg: T) => void) {
        this.functions.add(fn);
    }

    public remove(fn: (arg: T) => void) {
        this.functions.delete(fn);
    }
}
