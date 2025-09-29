import type { Config } from "tailwindcss";

//need to make sure everything can be moved to css or not necessary anymore before deleting this file
const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      objectPosition: {
        "center-up": "50% 35%",
        "center-down": "50% 75%",
      },
    },
  },
};
export default config;
