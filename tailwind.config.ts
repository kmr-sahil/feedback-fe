import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundOne: "rgba(var(--background-1))",
        backgroundTwo: "rgba(var(--background-2))",
        backgroundThree: "rgba(var(--background-3))",
        accentOne: "rgba(var(--accent-1))",
        accentTwo: "rgba(var(--accent-2))",
        accentThree: "rgba(var(--accent-3))",
        textOne: "rgba(var(--text-1))",
        textTwo: "rgba(var(--text-2))",
      },
      borderWidth: {
        special: "rgba(var(--stroke))",
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
