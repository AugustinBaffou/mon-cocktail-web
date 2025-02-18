/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary : "#1E2742",
      secondary : "#FB7D8A",
      green : "#82B70B",
      orange : "#F1A411",
      background : "#FEF9E4",
      white : "#FFFFFF"
    }
  },
  plugins: [],
}


