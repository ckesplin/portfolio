import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'selector',

  theme: {
    extend: {
      colors: {
        green: {
          950: '#0D0208',
          900: '#003B00',
          600: '#008F11',
          400: '#00FF41',
        },

        background: {
          DEFAULT: 'var(--color-bg)',
          surface: 'var(--color-surface)',
        },
        foreground: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-fg)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-fg)',
        },
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground.DEFAULT'),
            a: { color: theme('colors.accent.DEFAULT') },
            strong: { color: theme('colors.foreground.DEFAULT') },
            h1: { color: theme('colors.foreground.DEFAULT') },
            h2: { color: theme('colors.foreground.DEFAULT') },
            h3: { color: theme('colors.foreground.DEFAULT') },
            h4: { color: theme('colors.foreground.DEFAULT') },
            h5: { color: theme('colors.foreground.DEFAULT') },
            h6: { color: theme('colors.foreground.DEFAULT') },
            dt: { color: theme('colors.foreground.DEFAULT') },
            th: { color: theme('colors.foreground.DEFAULT') },
            code: { color: theme('colors.foreground.DEFAULT') },
            blockquote: {
              color: theme('colors.foreground.muted'),
              borderLeftColor: theme('colors.border.DEFAULT'),
            },
            hr: { borderColor: theme('colors.border.DEFAULT') },
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--color-bg': '#F2FFF4',
          '--color-surface': '#E0F5E3',
          '--color-border': '#C5ECC9',

          '--color-text': '#0D1A0F',
          '--color-text-muted': '#2D6B36',

          '--color-primary': '#003B00',
          '--color-primary-fg': '#C0FFCE',

          '--color-accent': '#008F11',
          '--color-accent-fg': '#ffffff',
        },

        '.dark': {
          '--color-bg': '#0D0208',
          '--color-surface': '#110310',

          '--color-border': '#003B00',

          '--color-text': '#C0FFCE',
          '--color-text-muted': '#6AFF90',

          '--color-primary': '#00FF41',
          '--color-primary-fg': '#0D0208',

          '--color-accent': '#008F11',
          '--color-accent-fg': '#C0FFCE',
        },
      })
    }),
  ],
}

export default config