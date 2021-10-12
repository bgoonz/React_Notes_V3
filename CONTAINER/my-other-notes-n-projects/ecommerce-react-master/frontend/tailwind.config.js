module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontfamily: {
        body: ['Nunito']
      }
    },
  },
  variants: {
    extend: {
      display: ['responsive', 'group-hover', 'group-focus'],
    },
  },
  plugins: [],
}
