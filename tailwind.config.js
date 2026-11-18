/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F48120',
          hover: '#D96B10',
          light: '#FFF4EB',
          luminous: '#FF943D',
          glow: 'rgba(244, 129, 32, 0.14)',
        },
        surface: {
          lightBg: '#FBF1F1',
          lightCard: '#FFFFFF',
          lightBorder: '#F2DCDC',
          lightPill: '#FFF4EB',
          darkBg: '#0E131B',
          darkCard: '#171F2C',
          darkBorder: '#263244',
          darkRecessed: '#1E293B',
        },
        typography: {
          lightPrimary: '#1C1917',
          lightSecondary: '#57534E',
          darkPrimary: '#F8FAFC',
          darkSecondary: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
