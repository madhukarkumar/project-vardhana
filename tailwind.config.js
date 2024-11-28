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
          dark: '#141414',
          secondary: {
            light: '#ffffff',
            dark: '#111111'
          },
          card: {
            light: '#ffffff',
            dark: '#000000'
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
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      // ... other variants
    }
  },
  safelist: [
    'snap-y',
    'snap-mandatory',
    'snap-start'
  ]
};