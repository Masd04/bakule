import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        se: "374px",
        xr: "413px",
        promax: "429px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },

      colors: {
      'cpblue': '#270858',
      'cpyellow': '#eab308',
      'cpgreen': '#22c55e',
      'cpred': '#dc2626',
      },
    },
  },
  plugins: [],
} satisfies Config;
