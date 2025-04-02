/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        quest: ["Questrial", "sans-serif"],
      },
      screens: {
        xs: "480px",

        giant: "1600px",
        se: { raw: "(max-width: 376px) and (max-height: 700px)" },
        "landscape-mobile": {
          raw: "(max-height: 440px) and (orientation: landscape)",
        },
        "se-mobile": {
          raw: "(max-height: 376px) and (orientation: landscape)",
        },
      },
    },
  },
  plugins: [],
}
