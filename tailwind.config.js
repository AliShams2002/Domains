/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-100': 'rgba(27, 22, 43, 0.5)',
      },
      boxShadow: {
        'xl': '0px 0px 2px 1px rgba(17, 14, 27, 0.5)',
        'lg': '0px 0px 1px 1px rgba(17, 14, 27, 0.2)',
      },
      borderRadius: {
        'sm': '4px'
      },
    },
  },
  plugins: [],
}

