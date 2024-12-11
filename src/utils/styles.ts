import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeStyle = (...styles: ClassValue[]) => twMerge(clsx(styles))