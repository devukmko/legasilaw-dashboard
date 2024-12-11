import type { Config } from "tailwindcss";
import daisyui from "daisyui"
import   { light }   from 'daisyui/src/theming/themes'    

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
      },
      spacing: {
        '128': '52rem',
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    darkTheme: false,
    // themes: true, // Add All themes
    themes: [
      {
        lawfirm: {
          "primary": "#006A28",
          "secondary": "#BF936A",
          "accent": "#212121",
          "neutral": "#212121",
          "base-100": "#ffffff",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
        light: {
          ...light,
          primary: "blue",
          secondary: "teal",
        },
      },
      "dark",
      "cupcake",
    ],
    darkMode: ['selector', '[data-theme="night"]']
  },
  // theme: {
  //   screens: {
  //     sm: '480px',
  //     md: '768px',
  //     lg: '976px',
  //     xl: '1440px',
  //   },
  //   fontFamily: {
  //     sans: ['Nunito Sans', 'sans-serif'],
  //     serif: ['Merriweather', 'serif'],
  //   },
  //   extend: {
  //     spacing: {
  //       '128': '32rem',
  //       '144': '36rem',
  //     },
  //     borderRadius: {
  //       '4xl': '2rem',
  //     },
  //     colors: {
  //       primary: {
  //         DEFAULT: '#00c0d8',
  //         50: '#ebffff',
  //         100: '#cefdff',
  //         200: '#a2f8ff',
  //         300: '#63f0fd',
  //         400: '#1cdef4',
  //         500: '#00c0d8',
  //         600: '#039ab7',
  //         700: '#0a7b94',
  //         800: '#126378',
  //         900: '#145265',
  //         950: '#063646'
  //       },
  //     'secondary': {
  //       DEFAULT: '#2d9596',
  //       50: '#f2fbfa',
  //       100: '#d4f3f1',
  //       200: '#a8e7e3',
  //       300: '#75d3cf',
  //       400: '#49b8b7',
  //       500: '#2d9596',
  //       600: '#237b7e',
  //       700: '#206265',
  //       800: '#1e4e51',
  //       900: '#1d4144',
  //       950: '#0b2628'
  //     },
  //     }
  //   },
  //   fontWeight: {
  //     thin: '100',
  //     hairline: '100',
  //     extralight: '200',
  //     light: '300',
  //     normal: '400',
  //     medium: '500',
  //     semibold: '600',
  //     bold: '700',
  //     extrabold: '800',
  //     black: '900'
  //   }
  // },
} satisfies Config;
