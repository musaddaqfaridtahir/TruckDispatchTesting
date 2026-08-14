/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1e2e3e',
          900: '#0F172A',
          950: '#0B1120',
        },
        slate: {
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706', // Primary Industrial Amber Accent
          700: '#B45309',
          800: '#92400E',
        },
        bgLight: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.15)',
        'amber-glow': '0 4px 20px -2px rgba(217, 119, 6, 0.35)',
      }
    },
  },
  plugins: [],
};
