/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FECACA", // red-200
          DEFAULT: "#EF4444", // red-500
          dark: "#B91C1C",    // red-700
        },
        secondary: {
          light: "#FFFFFF",   // white
          DEFAULT: "#FFFFFF", // white
          dark: "#1F2937",    // gray-800
        },
        background: {
          light: "#F3F4F6",   // gray-100
          dark: "#111827",    // gray-900
        },
        surface: {
          light: "#FFFFFF",   // white
          DEFAULT: "#F5F5F5", // neutral-100
          dark: "#1E293B",    // slate-800
        },
        neutral: {
          light: "#F5F5F5", // neutral-100
          DEFAULT: "#737373", // neutral-500
          dark: "#404040", // neutral-700
        },
        text: {
          light: "#FFFFFF",   // white
          DEFAULT: "#FFFFFF", // white
          dark: "#000000",    // black
          green: {
            light: "#86EFAC", // green-300
            DEFAULT: "#16A34A", // green-600
            dark: "#16A34A", // green-600
          },
        },
      },
    },
  },
  plugins: [],
}
