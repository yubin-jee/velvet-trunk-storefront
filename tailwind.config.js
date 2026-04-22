/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fdf6f4",
          100: "#fae9e4",
          200: "#f3d1c8",
          300: "#e9b2a4",
          400: "#dd8d7a",
          500: "#c96b55",
        },
        cream: {
          50: "#fbf8f3",
          100: "#f5efe4",
          200: "#ebe0cc",
        },
        gold: {
          400: "#c8a96a",
          500: "#b08d4c",
          600: "#927339",
        },
        ink: {
          900: "#2a1f1a",
          700: "#4a3a33",
          500: "#7a6a62",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.3em",
      },
    },
  },
  plugins: [],
};
