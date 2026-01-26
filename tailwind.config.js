/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1997f0",
        "glacier-blue": "#72bcd4",
        "forest-green": "#1b3022",
        "stone-gray": "#4a4e51",
        "sunrise-orange": "#f4a261",
        "print-bg": "#ffffff",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
