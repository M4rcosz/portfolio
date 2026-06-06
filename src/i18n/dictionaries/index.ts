import type { Lang } from "../config";
import { pt, type Dictionary } from "./pt";
import { en } from "./en";

export const dictionaries: Record<Lang, Dictionary> = { pt, en };

export type { Dictionary };
