/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#0077b6', // Deep Blue
            hover: '#023e8a',
          },
          secondary: {
            DEFAULT: '#90e0ef', // Cyan
            foreground: '#00b4d8',
          },
          background: '#ffffff',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        container: {
          center: true,
          padding: '1rem',
          screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
          },
        },
      },
    },
    plugins: [],
  }