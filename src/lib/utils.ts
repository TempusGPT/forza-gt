export const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const getErrorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : String(error);
};

export const parse = (formData: FormData, name: string) => {
    const value = formData.get(name);
    return {
        toFile: () => {
            if (value instanceof File) {
                return value;
            }
            throw new Error(`${name} is not a file.`);
        },
        toString: () => {
            if (typeof value !== "string") {
                throw new Error(`${name} is not a string.`);
            }
            return value;
        },
        toNumber: () => {
            if (typeof value !== "string") {
                throw new Error(`${name} is not a number.`);
            }
            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) {
                throw new Error(`${name} is not a number.`);
            }
            return parsedValue;
        },
    };
};
