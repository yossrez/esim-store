import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string | null {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch {
    return null;
  }
}

export function genRandTempId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
