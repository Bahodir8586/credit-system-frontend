module.exports = {
  purge: [
    './pages/**/*.{js,jsx}',
    './layouts/**/*.{js,jsx}',
    './modules/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
