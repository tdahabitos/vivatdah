/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mantine-color-scheme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'viva-orange': {
          100: '#fff6e0',
          200: '#ffebca',
          300: '#ffd699',
          400: '#ffbf63',
          500: '#ffac36',
          600: '#ffa018',
          700: '#ff9904',
          800: '#e48500',
          900: '#cb7500',
        },
      },
    },
  },
  plugins: [],
}
