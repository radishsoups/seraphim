/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    fontFamily: {
      custom: ['sera', 'sans-serif'],
    },
    extend: {
      colors: {
        lavender_blush: {
          DEFAULT: '#FAF0F3',
          100: '#491827',
          200: '#93314e',
          300: '#c95d7d',
          400: '#e1a6b8',
          500: '#faf0f3',
          600: '#fbf3f5',
          700: '#fcf6f8',
          800: '#fdf9fa',
          900: '#fefcfd',
          1000: "#2e2727",
          1001: "#3d3434"

        },
        ebony: {
          DEFAULT: '#6A4040',
          100: '#150d0d',
          200: '#2a1919',
          300: '#3f2626',
          400: '#543232',
          500: '#6a4040',
          600: '#945959',
          700: '#b27f7f',
          800: '#ccaaaa',
          900: '#e5d4d4',
        },
        rose: {
          DEFAULT: '#FFAFCC',
          100: '#56001f',
          200: '#ab003f',
          300: '#ff025f',
          400: '#ff5895',
          500: '#ffafcc',
          600: '#ffbed6',
          700: '#ffcee0',
          800: '#ffdeea',
          900: '#ffeff5',
        },
        black: {
          DEFAULT: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#333333',
          700: '#666666',
          800: '#999999',
          900: '#cccccc',
        },
      },
    },
  },
  plugins: [],
}

