import { onCleanup } from "solid-js";

export type Event = {
    addListener(listener: () => void): void;
    removeListener(listener: () => void): void;
    dispatch(): void;
};

export const createEvent = (): Event => {
    const listeners = new Set<() => void>();

    return {
        addListener(listener: () => void) {
            listeners.add(listener);
            onCleanup(() => listeners.delete(listener));
        },
        removeListener(listener: () => void) {
            listeners.delete(listener);
        },
        dispatch() {
            listeners.forEach((listener) => listener());
        },
    };
};
