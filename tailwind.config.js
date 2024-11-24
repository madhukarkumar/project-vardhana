/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000',
          secondary: {
            light: '#ffffff',
            dark: '#111111'
          },
          card: {
            light: '#ffffff',
            dark: '#141414'
          }
        },
        border: {
          card: {
            light: '#e5e7eb',
            dark: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
};