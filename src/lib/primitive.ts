import { createSignal } from "solid-js";

export const createState = <T extends Record<string, unknown>>(initialState: T) => {
    const state = {} as T;

    Object.keys(initialState).forEach((key) => {
        const [get, set] = createSignal(initialState[key]);
        Object.defineProperty(state, key, { get, set });
    });

    return state;
};
