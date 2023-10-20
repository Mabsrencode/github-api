/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'blue-dark': '#0b0d11',
      'gray-dark': '#11141a',
      'gray': '#21262d',
      // 'gray-light': '#d3dce6',
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    },
  },
  plugins: [],
});
