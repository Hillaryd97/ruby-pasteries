/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0d0205",
        background: "#fef2f2",
        primary: "#bf0700",
        secondary: "#f5c7d1",
        accent: "#25cba7",
      },
      fontFamily: {
        "playfair-display": ["Playfair Display", 'serif'],
        roboto: ["Roboto", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
