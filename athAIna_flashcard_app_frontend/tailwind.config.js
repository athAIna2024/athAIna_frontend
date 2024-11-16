/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Helvetica', 'Open Sans', 'sans-serif'],
      serif:  ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      droid: ['Droid Sans', 'Droid Serif', 'sans-serif'],
    },
    colors: {
      'athAIna-red': '#DA384C',
      'athAIna-yellow': '#FEE140',
      'athAIna-violet': '#914273',
      'athAIna-white': '#FFFFFF',
      'athAIna-orange': '#DC6B19'
    },
    extend: {
      fontSize: {
        'athAIna-lg': '20px',
        'athAIna-base': '16px',
        'athAIna-sm': '14px',
        'athAIna-xs': '12px',
      }
    },
  },
  plugins: [],
}

