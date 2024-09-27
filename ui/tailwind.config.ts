const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/providers/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      screens: {
        sm: { max: "767px" },
        md3xl: { min: "1920px" },
      },
      fontFamily: {
        lilita: ["lilita"],
      },

      colors: {
        "secondary-color": "#66c",
        "c-primary": "#7ca8c6",
        "body-bg": "#122638",
        "header-bg": "#0a1c30",
        primary: {
          100: "#f8d67a",
          200: "#f4aa5e",
          300: "#f88440",
        },
      },
    },
  },
  plugins: [nextui()],
};
