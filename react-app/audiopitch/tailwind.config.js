/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // TODO find new color pallete
        primary: '#ee5d6c',
        lighter1: '#fb9062',
        lighter2: '#eeaf61',
        lighter3: '#f6d7b0',
        darker1: '#ce4993',
        darker2: '#6a0d83',
      },
    },
  },
  plugins: [],
}
