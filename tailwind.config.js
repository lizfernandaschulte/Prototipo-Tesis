/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D9BF0',
          hover: '#1A8CD8',
          light: '#E8F5FE',
          dark: '#1570B0',
        },
        bg: {
          page: '#F5FAFD',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',
          input: '#CBD5E1',
        },
      },
    },
  },
  plugins: [],
}