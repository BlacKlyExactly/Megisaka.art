import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#f30637',
        light: '#ffffff',
        dark: '#090808',
      },
      fontFamily: {
        vinque: ['Vinque'],
        spartan: ['Spartan'],
      },
      padding: {
        page: '125px',
        'page-mobile': '24px',
      },
    },
  },
  plugins: [],
};
export default config;
