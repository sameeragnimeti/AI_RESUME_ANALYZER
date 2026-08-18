/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#dce9ff',
          200: '#b3d1ff',
          300: '#80b5ff',
          400: '#4d99ff',
          500: '#007AFF',
          600: '#0066DD',
          700: '#0052B3',
          800: '#003D8A',
          900: '#002960',
        },
        accent: {
          indigo: '#5856D6',
          purple: '#AF52DE',
          pink: '#FF2D55',
          red: '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green: '#34C759',
          teal: '#5AC8FA',
          cyan: '#34AADC',
        },
      },
      borderRadius: {
        '4xl': '28px',
        '5xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
        'liquid-float': 'orbA 22s ease-in-out infinite',
        'liquid-float-2': 'orbB 26s ease-in-out infinite',
        'liquid-float-3': 'orbC 20s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'border-flow': 'borderFlow 6s linear infinite',
        'gradient-flow': 'gradientFlow 8s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        '3xl': '64px',
        '4xl': '80px',
      },
      boxShadow: {
        'liquid': '0 2px 8px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)',
        'liquid-md': '0 4px 12px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
        'liquid-lg': '0 8px 24px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        'liquid-xl': '0 12px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        'liquid-glow': '0 0 40px rgba(0,122,255,0.15), 0 0 80px rgba(0,122,255,0.08)',
        'liquid-glow-accent': '0 0 40px rgba(88,86,214,0.15), 0 0 80px rgba(88,86,214,0.08)',
        'liquid-inner': 'inset 0 1px 0 rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
}
