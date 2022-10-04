/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        'skeptic': '#CAE7E3',
        'silver': '#B2B2B2',
        'bush': '#EEB8C5',
        'qgray': '#DCDBD9',
        'pink': '#FEC7BC'
      },
      fontFamily: {
        'burtons': ['burtons'],
        'burtonsScript': ['burtons-script']
      }
    },
  },
  plugins: [],
}
