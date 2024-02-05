export class Delegate<T = void> {
    private functions = new Set<(arg: T) => void>();

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
