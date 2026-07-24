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
        // Palette
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
        paper: 'rgb(var(--surface-paper) / <alpha-value>)', // fixes previously-undefined bg-paper/text-paper
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
          inverse: 'rgb(var(--surface-inverse) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--content) / <alpha-value>)',
          soft: 'rgb(var(--content-soft) / <alpha-value>)',
          brand: 'rgb(var(--content-brand) / <alpha-value>)',
          accent: 'rgb(var(--content-accent) / <alpha-value>)',
          inverse: 'rgb(var(--content-inverse) / <alpha-value>)',
        },
        border: {
          subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
          strong: 'rgb(var(--border-strong) / <alpha-value>)',
          brand: 'rgb(var(--border-brand) / <alpha-value>)',
          accent: 'rgb(var(--border-accent) / <alpha-value>)',
          danger: 'rgb(var(--border-danger) / <alpha-value>)',
        },
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        md: '12px',
        lg: '20px',
        xl: '32px',
        field: '10px',
        card: '16px',
        image: '14px',
        pill: '9999px',
      },
      boxShadow: {
        hairline: '0 0 0 1px rgba(6, 78, 59, 0.06)',
        soft: '0 4px 24px -8px rgba(6, 78, 59, 0.10)',
        lift: '0 14px 40px -14px rgba(6, 78, 59, 0.18)',
        overlay: '0 24px 64px -20px rgba(6, 78, 59, 0.28)',
      },
      backgroundImage: {
        'gradient-emerald-fade': 'var(--gradient-emerald-fade)',
        'gradient-gold-rule': 'var(--gradient-gold-rule)',
        'gradient-hero-veil': 'var(--gradient-hero-veil)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '280ms',
        slow: '480ms',
      },
    },
  },
  plugins: [],
};
