/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EDEEF0',
        'paper-dark': '#E2E4E8',
        'paper-light': '#FFFFFF',
        studio: '#EDEEF0',
        'studio-card': '#FCFCFC',
        obsidian: '#111111',
        ink: '#111111',
        'ink-muted': '#666666',
        electric: '#684AFF',
        ochre: '#D97706',
        terracotta: '#C2412C',
        emerald: '#0D5C3A',
        background: '#EDEEF0',
        foreground: '#111111',
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
