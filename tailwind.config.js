/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ciro: {
          cream: '#FEF7EC',
          red: '#E6A89B',
          orange: '#E6B583',
          saffron: '#F6E2B2',
          olive: '#819273',
          lime: '#B8D69A',
          espresso: '#7D594E',
          dark: '#171512',
          light: '#FEF7EC',
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        rozha: ['"Rozha One"', 'Georgia', 'serif'],
        serif: ['"Rozha One"', 'Georgia', 'serif'],
        display: ['"Rozha One"', 'Georgia', 'serif'],
        bristol: ['"Bristol Hand"', '"Caveat"', 'cursive'],
        hand: ['"Bristol Hand"', '"Caveat"', 'cursive'],
        script: ['"Bristol Hand"', 'cursive'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px #171512',
        'retro-lg': '8px 8px 0px 0px #171512',
        'retro-orange': '4px 4px 0px 0px #F28C28',
        'retro-red': '4px 4px 0px 0px #D94A32',
      }
    },
  },
  plugins: [],
}
