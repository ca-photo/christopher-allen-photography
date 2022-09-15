/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '484px',
      ...defaultTheme.screens,
    },
    extend: {
      // font stacks selected from https://www.cssfontstack.com/
      fontFamily: {
        sans: [
          'Calibri',
          'Candara',
          'Segoe',
          'Segoe UI',
          'Optima',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Baskerville',
          'Baskerville Old Face',
          'Hoefler Text',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
      },
      gridTemplateColumns: {
        album: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      gridTemplateRows: {
        album: '40px',
      },
      gridAutoRows: {
        album: '200px',
      },
    },
  },
  plugins: [],
};
