import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        md: "2px 4px 4px rgba(0, 0, 0, 0.7)",
        lg: "6px 4px 6px rgba(0, 0, 0, 1)",
      },

      fontFamily: {
        alice: "Alice, sans-serif",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
} satisfies Config;
