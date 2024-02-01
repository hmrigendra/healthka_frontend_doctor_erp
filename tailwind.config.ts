import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "production-blue": "#32b5ff",
        "production-red": "#e8a1a2",
        "production-indigo": "#8596ed",
        "production-white": "#d6ddff",
        "production-green": "#8bcd00",
        "production-yellow": "#ffd643",
        "production-white2": "#f0f2ff",
        "production-gray": "#d9d9d9",
      },
    },
  },
  plugins: [],
};
export default config;
