module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        101: "1.01",
      },
      fontFamily: {
        primaryTypefaceJosefin: ["Josefin Sans", "sans-serif"],
        secondaryTypefaceDmSans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#b80f0a",
        heading_red: "#D31603",
        secondary: "#232323",
        Third: "#2f3034",
        customWhite: "#e2e2e2",
        actionBlack: "#2f3034",
        layerBlack: "#2F3034",
      },
    },
  },
  plugins: [],
};
