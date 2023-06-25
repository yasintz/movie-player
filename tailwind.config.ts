import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx,css,scss}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
};

export default config;
