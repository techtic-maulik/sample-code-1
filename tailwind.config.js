/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        AvantGarde: ["Avant Garde Medium BT"],
        AvantGardeBk: ["AvantGarde-bk"],
      },
      screens: {
        lg: "992px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontWeight: {
        midle: 400,
        extrabold: 700,
      },
      fontSize: {
        "custom-lg": "30px",
        "custom-md": "16px",
        "custom-sm": "12px",
      },
      colors: {
        primary: "#797EF6",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
