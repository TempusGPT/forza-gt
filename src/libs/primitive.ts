import { createMemo as createSolidMemo, createSignal as createSolidSignal } from "solid-js";

export const createSignal = <T>(initialValue: T) => {
    const [get, set] = createSolidSignal(initialValue);
    return { get, set };
};

export const createMemo = <T>(fn: () => T) => {
    const get = createSolidMemo(fn);
    return { get };
};
