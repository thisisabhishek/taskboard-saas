/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          '50': '#ecf0ff',
          '100': '#dde3ff',
          '200': '#c2cbff',
          '300': '#9ca8ff',
          '400': '#7579ff',
          '500': '#6059ff',
          '600': '#4d36f5',
          '700': '#422ad8',
          '800': '#3625ae',
          '900': '#2f2689',
          '950': '#1e1650',
        },
      },
    },
  },
  plugins: [],
};
