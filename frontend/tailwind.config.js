import flowbitePlugin from "flowbite/plugin"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Futuristic Color Palette
        'tech-black': '#0a0a0a',
        'tech-dark': '#111111',
        'tech-gray': '#1a1a1a',
        'tech-light': '#2a2a2a',
        'tech-white': '#f8f9fa',
        'tech-blue': '#00d4ff',
        'tech-purple': '#7c3aed',
        'tech-pink': '#ec4899',
        'tech-cyan': '#06b6d4',
        'tech-emerald': '#10b981',
        'tech-orange': '#f97316',
        'tech-yellow': '#eab308',
        'tech-red': '#ef4444',
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.3)',
        'glass-blue': 'rgba(0, 212, 255, 0.1)',
        'glass-purple': 'rgba(124, 58, 237, 0.1)',
      },
      fontFamily: {
        'tech': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'futura': ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'rotate-slow': 'rotate 20s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'center top' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'center bottom' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'cyber-gradient': 'linear-gradient(45deg, #00d4ff, #7c3aed, #ec4899, #00d4ff)',
        'neon-gradient': 'linear-gradient(45deg, #00d4ff, #06b6d4, #7c3aed)',
        'sunset-gradient': 'linear-gradient(45deg, #f97316, #ec4899, #7c3aed)',
        'ocean-gradient': 'linear-gradient(45deg, #06b6d4, #00d4ff, #10b981)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 4px 16px 0 rgba(255, 255, 255, 0.1)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.5)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'tech': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'tech-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [flowbitePlugin],
}

