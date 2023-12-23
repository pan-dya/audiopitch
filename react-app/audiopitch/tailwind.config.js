/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
    },
  },
  plugins: [],
};
