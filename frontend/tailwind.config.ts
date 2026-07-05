import type { Config } from 'tailwindcss';

// Every value below is pulled directly from project/Nova OS.dc.html — the
// approved design prototype — rather than Tailwind's default scale, so the
// rebuild stays pixel-traceable to the source file (blueprint §2/§4).
//
// One-off values that don't belong in a shared scale (a specific rgba
// opacity, a specific glow shadow) are applied at the call site with
// Tailwind's arbitrary-value syntax instead of being pre-named here, e.g.
// `bg-white/[0.045]` or `shadow-[0_0_50px_rgba(87,169,255,0.4)]`.

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        nova: {
          bg: '#04060c',
          'bg-1': '#0a1428',
          'bg-2': '#060a15',
          blue: '#57a9ff',
          'blue-soft': '#8fc0ff',
          'blue-pale': '#cfe2ff',
          violet: '#7a56ff',
          cyan: '#2ddcff',
          mint: '#6effc0',
        },
      },
      fontFamily: {
        // Bound to the CSS variables next/font generates in layout.tsx —
        // self-hosted, so these need the var() reference, not the bare name.
        display: ['var(--font-space-grotesk)', '"Space Grotesk"', 'sans-serif'],
        body: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        9: '9px',
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
      },
      backdropBlur: {
        20: '20px',
        24: '24px',
        30: '30px',
        40: '40px',
      },
      boxShadow: {
        'glow-sm': '0 0 14px rgba(87,169,255,0.5)',
        glow: '0 0 22px rgba(87,169,255,0.5)',
        'glow-lg': '0 0 50px rgba(87,169,255,0.4)',
        panel: '0 24px 70px rgba(0,0,0,0.55)',
      },
      keyframes: {
        novaFloat: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(4%,-6%) scale(1.08)' },
        },
        novaFloat2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-5%,4%) scale(1.12)' },
        },
        novaPulse: {
          '0%, 100%': { opacity: '.55' },
          '50%': { opacity: '1' },
        },
        novaBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        novaUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        novaIn: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        novaPop: {
          from: { opacity: '0', transform: 'scale(.94) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        novaScan: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(400%)' },
        },
        novaSpin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'nova-float': 'novaFloat 18s ease-in-out infinite',
        'nova-float2': 'novaFloat2 22s ease-in-out infinite',
        'nova-pulse': 'novaPulse 2.4s ease-in-out infinite',
        'nova-blink': 'novaBlink 1.1s step-end infinite',
        'nova-up': 'novaUp .6s ease',
        'nova-in': 'novaIn .35s ease',
        'nova-pop': 'novaPop .5s ease',
        'nova-scan': 'novaScan 2s linear infinite',
        'nova-spin': 'novaSpin 1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;