/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "shaw-garnet": "#960A2C",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  plugins: [],
};
