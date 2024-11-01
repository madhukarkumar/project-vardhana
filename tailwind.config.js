/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      fontFamily: {
        'avant-garde': ['itc-avant-garde-gothic-pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};