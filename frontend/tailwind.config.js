/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "550px",
        md: "1024px",
        lg: "1500px",
        xl: "3000px",
      },
     
    },
  },
  plugins: [],
};
