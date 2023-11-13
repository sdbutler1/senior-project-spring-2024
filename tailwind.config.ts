import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'shaw-garnet': '#7d1f2d',//'#960A2C',
        'shaw-yellow': '#F4B461',
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  plugins: [],
}
export default config
