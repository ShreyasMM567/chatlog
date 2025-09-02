import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'glow-slow': 'glow 6s ease-in-out infinite',
        'glow-slower': 'glow 8s ease-in-out infinite',
        'float-slow': 'floatY 12s ease-in-out infinite',
        'float-medium': 'floatY 8s ease-in-out infinite',
        'float-fast': 'floatY 5s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        glow: {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)',
            filter: 'blur(0px)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)',
            filter: 'blur(1px)'
          },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
