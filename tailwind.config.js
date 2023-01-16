/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui:{
    styled: true,
    themes: [{
      mytheme: {
      
"primary": "#6b7280",
      
"secondary": "#4b5563",
      
"accent": "#e5e7eb",
      
"neutral": "#23282F",
      
"base-100": "#212121",
      
"info": "#0092D6",
      
"success": "#6CB288",
      
"warning": "#f87171",
      
"error": "#991b1b",
      },
    },],
    base: true,
    utils: true,
    logs: true,
  }
}
