/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  plugins: [require("daisyui")],
  theme: {
    colors: {
      blue: "#0043C6",
      black: "#303030",
      grey: "#F5F5F5",
      white: "#FFFFFF",
    },
  },
};
