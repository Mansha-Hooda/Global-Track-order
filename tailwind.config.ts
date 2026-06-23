import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
