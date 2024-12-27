module.exports = {
  darkMode: "class", // Dark mode diaktifkan menggunakan class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1a202c", // Warna untuk bg-gray-900
        },
      },
    },
  },
  plugins: [],
};
