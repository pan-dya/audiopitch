/** @type {import('tailwindcss').Config} */
const { withUt } = require("uploadthing/tw");

module.exports = withUt ({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#431bc3",
        primarylighter: "#a18de1",
        bgprimary: "#c4fc04",
        bgsecondary: "#bcdb5d",
        bgdarker: "#b9c493",
        shade: "#edfeb4",
        shade2: "#f9ffe6",
        shadedark: "#273201",
        textcolor: "#bce43c",
        textcolorl: "#5e721e",
        softcream: "#F9F9E0"
      },
      boxShadow: {
        '3xl-1': '-10px 15px 60px 15px rgba(0, 0, 0, 0.5)',
        '3xl-2': '10px 15px 60px 15px rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
});
