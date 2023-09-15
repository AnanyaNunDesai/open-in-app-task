/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      figtree: ["Figtree", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      montserrat: ["Montserrat"],
      "open-sans": ["Open Sans", "sans-serif"],
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
        "search-gray": "#B0B0B0",
        "growth-bubble": "#E9F9EB",
        "growth-detail": "#4AD15F",
        "profile-button": "#F2F2F2",
        "next-button": "#3E84F8",
        "dashboard-bg": "#F8FAFF",
      },
    },
  },
  plugins: [],
};
