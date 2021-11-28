module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      ringColor: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      textDecoration: ["focus-visible"],
      outline: ["focus-visible"],
    },
  },
  plugins: [],
};
