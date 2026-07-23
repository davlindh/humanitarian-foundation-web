/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'Hind', 'sans-serif'],
        sans: ['Hind', 'system-ui', 'sans-serif'],
      },
      colors: {
        emerald: {
          deep: 'rgb(var(--color-emerald-deep) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-emerald) / <alpha-value>)',
          soft: 'rgb(var(--color-emerald-soft) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          soft: 'rgb(var(--color-gold-soft) / <alpha-value>)',
        },
        parchment: 'rgb(var(--color-parchment) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        hufida: {
          primary: "#064e3b",
          "primary-content": "#f5f0e0",
          secondary: "#0d7a5f",
          "secondary-content": "#ffffff",
          accent: "#c9a84c",
          "accent-content": "#141e19",
          neutral: "#141e19",
          "neutral-content": "#f5f0e0",
          "base-100": "#fdfaf0",
          "base-200": "#f5f0e0",
          "base-300": "#e0d9c4",
          "base-content": "#141e19",
          info: "#0d7a5f",
          success: "#0d7a5f",
          warning: "#c9a84c",
          error: "#9b2c2c",
        },
      },
    ],
  },
};
