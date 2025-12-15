import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colorSystem = {
  primary: {
    light: "rgb(var(--green-light))",
    medium: "rgb(var(--green-medium))", 
    dark: "rgb(var(--green-dark))",
  },
  secondary: {
    light: "rgb(var(--blue-light))",
    medium: "rgb(var(--blue-medium))",
    dark: "rgb(var(--blue-dark))",
  },
  background: {
    primary: "rgb(var(--background))",
    secondary: "rgb(var(--background-secondary))",
    tertiary: "rgb(var(--background-tertiary))",
  },
  text: {
    primary: "rgb(var(--text-primary))",
    secondary: "rgb(var(--text-secondary))",
    muted: "rgb(var(--text-muted))",
  },
  border: {
    primary: "rgb(var(--border))",
    secondary: "rgb(var(--border-secondary))",
  },
} as const