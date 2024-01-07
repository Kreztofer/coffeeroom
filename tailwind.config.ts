/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        myblue: '#10CEF7',
        myGrey: '#bdbebe',
      },
      screens: {
        xs: '350px',
        ss: '740px',
        sm: '768px',
        sl: '810px',
        ms: '912px',
        md: '1020px',
        lg: '1200px',
        xl: '1500px',
      },
    },
  },
  plugins: [],
};
