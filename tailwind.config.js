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
      },
    },
  },
  plugins: [],
};
