/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'backdrop': '#fdf8ef',
      'primary': '#1c6758',
      'secondary': '#83AA9d',
      'additional': '#FFFFFF',
      'typeface': '#3c1518',
    },
    fontFamily: {
      body: ['Fredoka One', 'sans-serif'],
      title: ['Fredoka', , 'sans-serif']
      }
  },
  plugins: [],
}
