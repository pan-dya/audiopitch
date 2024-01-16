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
        primary: "#5035b5",
        primarylighter: "#9330b5",
        bgprimary: "#abcc40",
        bgsecondary: "#a5b17d",
        shade: "#edfeb4",
        shade2: "#f9ffe6",
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
