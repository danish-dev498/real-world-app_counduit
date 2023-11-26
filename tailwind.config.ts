import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      container: {
        // padding: 'rem',
        // screens: {
        //   xs: '360px',
        //   sm: '480px',
        //   md: '768px',
        //   lg: '1024px',
        //   xl: '1280px',
        //   '2xl': '1536px',
        // },
      },
      colors: {
        'steel-blue-800': '#18868e',
        'steel-blue-700': '#1ea6b0',
        'steel-blue-600': '#24c6d2',
        'steel-blue-500': '#2ecfdb',
        'steel-blue-400': '#4fd7e1',
        'steel-blue-300': '#71dfe7',
        'steel-blue-100': '#92e6ec',
      },
    },
  },
  plugins: [],
};
export default config;
