import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F2A459",
        secondary: "#F8D17F",
        accent: "#97BDFA",
        highlight: "#AECE7B",
        warning: "#C9A188",
        background: "#FFFFFF",
        text: "#333333",
      },
    },
  },
  plugins: [],
} satisfies Config;

