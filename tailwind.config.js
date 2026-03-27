/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1a3a2e',
          light: '#2a5040',
          dark: '#0d2518',
        },
        accent: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
          dark: '#962d22',
        },
        cream: '#f0ede6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
