import { createSignal, onCleanup } from "solid-js";

export type Event<T> = {
    addListener(listener: (value: T) => void): void;
    removeListener(listener: (value: T) => void): void;
    dispatch(value: T): void;
};

export const createEvent = <T = void>(): Event<T> => {
    const listeners = new Set<(value: T) => void>();
    onCleanup(() => listeners.clear());

    return {
        addListener(listener: (value: T) => void) {
            listeners.add(listener);
        },
        removeListener(listener: (value: T) => void) {
            listeners.delete(listener);
        },
        dispatch(value: T) {
            listeners.forEach((listener) => listener(value));
        },
    };
};

export const createState = <T>(value: T) => {
    const [signal, setSignal] = createSignal(value);

    return {
        get value() {
            return signal();
        },
        set(value: T) {
            setSignal(() => value);
        },
    };
};
