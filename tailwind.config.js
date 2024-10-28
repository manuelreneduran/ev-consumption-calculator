/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        Black: "rgba(17, 14, 20, 1)",
        "Black-80": "rgba(17, 14, 20, 0.8)",
        "Black-50": "rgba(17, 14, 20, 0.4)",
        "Black-25": "rgba(17, 14, 20, 0.25)",
        "Black-10": "rgba(17, 14, 20, 0.1)",
        "Black-03": "rgba(17, 14, 20, 0.03)",
        "Red-Dark": "rgba(200, 32, 32, 1)",
        "Red-Light": "rgba(234, 88, 12, 1)",
        Blue: "rgba(117, 131, 255, 1)",
        "light-blue": "#e3eaf0",
        "White-80": "rgba(255, 255, 255, 0.8)",
        "Dark-Highlight-Gray": "rgba(220, 224, 233, 1)",
        "Off-White": "rgba(242, 242, 242, 1)",
        primary: {
          light: "#6DFFC9",
          default: "#0D3046",
          dark: "#17BDAB",
        },
        Header: "rgba(90, 93, 102, 1)",
        "Canary-Yellow": "rgba(237, 221, 79, 1)",
      },
      backgroundImage: {
        "teal-gradient": "linear-gradient(135deg, #6DFFC9, #17BDAB)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
