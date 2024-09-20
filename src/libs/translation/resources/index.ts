import type { Resources } from "./types";
import { en } from "./resource.en";
import { ko } from "./resource.ko";

export const resources: Resources = { ko, default: en };
export * from "./types";
