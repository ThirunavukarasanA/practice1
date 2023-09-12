/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '766px' },
      // => @media (min-width: 640px) { ... }
      'mdsm': '641px',
      // => @media (min-width: 768px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lgmd': '1023px',
      // => @media (min-width: 1024px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      'sm': '14px',
      'tiny': '12px',
      'base': '16px',
      'h6': '16px',
      'h5': '18px',
      'h4': '20px',
      'h3': '22px',
      'h2': '24px',
      'h1': '36px',
    },
    colors: {
      'primary': '#7C0201',
      'secondary': '#1589ee',
      'facebook': '#4267B2',
      'twitter': '#1DA1F2',
      'whatsapp': '#25D366',
      'linkidn': '#0077B5',
      'thumbs': '#8C191B',
      'lightBlue': '#deebfa',
      'bluecontact':'#4A90E2',
      'span':'#e76a6a',
      'background': '#f2f2f2',
      'third': '#4B545F',
      'black': '#000000',
      'font-color': '#222',
      'white': '#fff',
      'orange-400': '#fb923c87',
      'border-color': '#C0C3C6',
      'link-color': '#54a2ff',
      'text-color': '#4B545F',
      'green': '#228B22',
      'red':'rgb(220 38 38)',
      'grey': '#808080',
      'HoverBlack': '#0c0b0b42',
      'HoverWhite': '#f2f2f24d',
    },
    borderRadius: {
      'md': '4px',
      'lg': '0.5rem',
      'full': '9999px',
    },
    extend: {},
  },
  plugins: [],
}