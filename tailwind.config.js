/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#343541",
        dark_gray: "#202123",
        green: "#10a37f",
        dark_green: "#1a7f64",
        gray_hover: "#2A2B32",
        gray_light: "#40414f",
      },
      keyframes: {
        flicker: {
          "0%, 100%": {
            opacity: 0,
          },
          "33%": { opacity: 1 },
        },
        flicker2: {
          "0%, 100%": {
            opacity: 0,
          },
          "66%": { opacity: 1 },
        },
      },
      transitionTimingFunction: {
        sharp: "cubic-bezier(.25,.1,.25,1)",
      },
      animation: {
        param: "flicker 2s infinite",
        param2: "flicker2 2s infinite",
      },
    },
  },
  plugins: [],
};
