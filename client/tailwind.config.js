/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/index.js",
    "./src/Header.js",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#FFFFFF',
        'secondary': '#E8E8E8',
        'third': '#1E1E1E'
      },
      borderColor: {
        'primary': '#1E1E1E'
      },
      spacing: {
        '25': '10rem'
      },
      borderWidth: {
        '5': '0.15rem'
      },
      colors: {
        'primary': '#FFFFFF',
        'secondary': '#E8E8E8',
        'third': '#1E1E1E'
      }
    },
  },
  plugins: [],
}

