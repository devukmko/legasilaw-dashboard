import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: '#c49c6e',
        'dark-gold': '#a37e4d',
        'light-gray': '#f5f5f5',
        'medium-gray': '#d4d4d4',
        'dark-gray': '#333333',
        'text-dark': '#1a1a1a', // Use for dark text
        'text-light': '#ffffff', // Use for light text
      },
    },
  },
  plugins: [],
} satisfies Config;
