import type { Translation } from "./types";
import { en } from "./resource.en";
import { ko } from "./resource.ko";

export const resources: Record<string, Translation> = { ko, fallback: en };
export * from "./types";
