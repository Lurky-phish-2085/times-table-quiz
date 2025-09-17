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
          dark: "#1E293B",    // slate-800
        },
        text: {
          light: "#1F2937",   // gray-800
          dark: "#E5E7EB",    // gray-200
        },
      },
    },
  },
  plugins: [],
}
