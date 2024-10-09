/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      fontFamily: {
        body: ['"Roboto"', "sans-serif"],
      },
      extend: {
        colors: {
          devzery: "#f257a0",
          altBg: "#3f3f46",
          bg: "#18181b",
        },
      },
    },
    plugins: [],
  };