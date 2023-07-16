/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        'half-trans': 'rgba(255 ,255 ,255 ,0.5)',
        'dark-trans': 'rgba(0 ,0 ,0 ,0.5)',
        'app':'rgb(10, 13, 22)',
        'light': {
          'bg': {
            'main': '#e7eaf6',
            'second': '#a2a8d3',
          }

        }, 'dark': {
          'bg': {
            'main': 'rgb(17, 24, 39)',
            'second':'rgb(27, 38, 61)'
          }
        }
      }
      
    },
  },
  plugins: [],
}