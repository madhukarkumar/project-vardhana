/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.813rem',    // 13px
        'sm': '0.938rem',    // 15px
        'base': '1.063rem',  // 17px
        'lg': '1.188rem',    // 19px
        'xl': '1.313rem',    // 21px
        '2xl': '1.563rem',   // 25px
        '3xl': '1.938rem',   // 31px
        '4xl': '2.313rem',   // 37px
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
};