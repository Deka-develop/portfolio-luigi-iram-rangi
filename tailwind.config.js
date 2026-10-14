/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5F1',
        'paper-dark': '#ECEAE3',
        'paper-light': '#FFFFFF',
        ink: '#141413',
        'ink-muted': '#686660',
        ochre: '#D97706',
        terracotta: '#C2412C',
        emerald: '#0D5C3A',
        background: '#F6F5F1',
        foreground: '#141413',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
