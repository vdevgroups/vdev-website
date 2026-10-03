/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vdev: {
          black: '#050505',
          graphite: '#121212',
          charcoal: '#1a1a1a',
          gold: '#cca560',
          'gold-glow': 'rgba(204, 165, 96, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f0dfa8 0%, #cca560 50%, #8a6729 100%)',
      }
    },
  },
  plugins: [],
}
