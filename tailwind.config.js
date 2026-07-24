/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Hind', 'system-ui', 'sans-serif'],
      },
      colors: {
        emerald: {
          deep: 'rgb(var(--color-emerald-deep) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-emerald) / <alpha-value>)',
          soft: 'rgb(var(--color-emerald-soft) / <alpha-value>)',
          mist: 'rgb(var(--color-emerald-mist) / <alpha-value>)',
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
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(6, 78, 59, 0.10)',
        lift: '0 14px 40px -14px rgba(6, 78, 59, 0.18)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        hufida: {
          primary: "#064e3b",
          "primary-content": "#faf6ec",
          secondary: "#0d7a5f",
          "secondary-content": "#ffffff",
          accent: "#c9a84c",
          "accent-content": "#1a221e",
          neutral: "#1a221e",
          "neutral-content": "#faf6ec",
          "base-100": "#faf6ec",
          "base-200": "#f2ecd8",
          "base-300": "#e0d9c4",
          "base-content": "#1a221e",
          info: "#0d7a5f",
          success: "#0d7a5f",
          warning: "#c9a84c",
          error: "#9b2c2c",
          "--rounded-box": "1rem",
          "--rounded-btn": "9999px",
          "--rounded-badge": "9999px",
        },
      },
    ],
  },
};
