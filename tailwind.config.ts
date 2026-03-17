import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ── Paleta de cores ──────────────────────────────────────
      colors: {
        rose: {
          DEFAULT: '#c4566b',
          deep:    '#a8395a',
          light:   '#f2c0cb',
          pale:    '#fdf0f3',
        },
        mint: {
          DEFAULT: '#4dbfb4',
          deep:    '#329e93',
          light:   '#b2e8e4',
          pale:    '#f0fafa',
        },
        peach: {
          DEFAULT: '#f0cba8',
          deep:    '#d4975a',
        },
        ink: {
          DEFAULT: '#271620',
          soft:    '#4a2f3c',
        },
        muted:  '#8a6e77',
        cream:  '#fdfaf7',
        canvas: '#faf7f4',
        border: {
          DEFAULT: '#eddde5',
          soft:    '#f5edf0',
        },
      },

      // ── Tipografia ──────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },

      // ── Sombras customizadas ─────────────────────────────────
      boxShadow: {
        sm: '0 2px 12px rgba(39,22,32,0.06)',
        md: '0 8px 32px rgba(39,22,32,0.09)',
        lg: '0 20px 60px rgba(39,22,32,0.13)',
      },

      // ── Border radius extras ─────────────────────────────────
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },

      // ── Animações ───────────────────────────────────────────
      keyframes: {
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'kenburns': {
          '0%':   { transform: 'scale(1.06) translate(0, 0)' },
          '100%': { transform: 'scale(1.0) translate(-1%, -1%)' },
        },
        'scroll-line': {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top',    opacity: '1' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top',    opacity: '1' },
          '51%':  { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.7)' },
        },
        'wpp-pulse': {
          '0%, 100%': { boxShadow: '0 6px 24px rgba(37,211,102,0.38)' },
          '50%':      { boxShadow: '0 6px 24px rgba(37,211,102,0.65)' },
        },
      },
      animation: {
        'fade-down':   'fade-down 0.9s cubic-bezier(0.4,0,0.2,1) both',
        'fade-up':     'fade-up 0.9s cubic-bezier(0.4,0,0.2,1) both',
        'kenburns':    'kenburns 18s ease-in-out infinite alternate',
        'scroll-line': 'scroll-line 1.8s ease-in-out infinite',
        'pulse-dot':   'pulse-dot 2s ease-in-out infinite',
        'wpp-pulse':   'wpp-pulse 2s ease-in-out infinite',
      },

      // ── Delay de animação ────────────────────────────────────
      transitionDelay: {
        '0':   '0ms',
        '80':  '80ms',
        '160': '160ms',
        '240': '240ms',
        '320': '320ms',
        '400': '400ms',
        '480': '480ms',
      },
    },
  },
  plugins: [],
} satisfies Config
