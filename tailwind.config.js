/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      figtree: ["Figtree"],
      lato: ["Lato", "sans-serif"],
      montserrat: ["Montserrat"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        secondary: "#858585",
        link: "#346BD4",
        "input-field": "#F5F5F5",
        "bg-blue-start": "#4285F4",
        "bg-blue-end": "#286DE0",
        "bg-default": "#F8FAFF",
        "button-confirm": "#4285F4",
      },
    },
  },
  plugins: [],
};
