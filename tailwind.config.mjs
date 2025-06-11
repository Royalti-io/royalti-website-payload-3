/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'appear': 'appear 0.5s ease-out forwards',
        'appear-zoom': 'appear-zoom 0.5s ease-out forwards',
      },
      maxWidth: {
        'container': '80rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'appear': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'appear-zoom': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
      },
      colors: {
        brand: 'hsl(var(--brand))',
        'brand-foreground': 'hsl(var(--brand-foreground))',
        // Royalti.io brand colors based on #006666
        royal: {
          50: 'hsl(var(--royal-50))',   /* Very light royal */
          100: 'hsl(var(--royal-100))', 
          200: 'hsl(var(--royal-200))', 
          300: 'hsl(var(--royal-300))', 
          400: 'hsl(var(--royal-400))', 
          500: 'hsl(var(--royal-500))', 
          600: 'hsl(var(--royal-600))', /* #006666 - Primary brand color */
          700: 'hsl(var(--royal-700))', /* #03321e - Midnight */
          800: 'hsl(var(--royal-800))', /* #1b2023 - Dark */
          900: 'hsl(var(--royal-900))',
          DEFAULT: 'hsl(var(--royal-600))', /* Default to primary brand color */
        },
        // Secondary brand colors from guidelines
        'royal-green': {
          DEFAULT: 'hsl(var(--secondary-green))',     /* #009d73 */
          light: 'hsl(var(--secondary-green-light))', /* #00d199 */
          lighter: 'hsl(var(--secondary-green-lighter))', /* #66e3c2 */
          lightest: 'hsl(var(--secondary-green-lightest))', /* #ccf6eb */
        },
        'royal-blue': {
          DEFAULT: 'hsl(var(--secondary-blue))',      /* #c2cfff */
          medium: 'hsl(var(--secondary-blue-medium))', /* #99afff */
          light: 'hsl(var(--secondary-blue-light))',   /* #bfd7ff */
        },
        'royal-yellow': {
          DEFAULT: 'hsl(var(--secondary-yellow))',      /* #ffcc00 */
          light: 'hsl(var(--secondary-yellow-light))',   /* #ffe266 */
          lighter: 'hsl(var(--secondary-yellow-lighter))', /* #ffeb99 */
          lightest: 'hsl(var(--secondary-yellow-lightest))', /* #fff5cc */
        },
        'royal-orange': 'hsl(var(--accent))', /* #f3784e */
        // Complementary accent colors for modern/minimal design
        accent: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // Override shadcn defaults with brand colors
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        sans: ['Red Hat Display', 'system-ui', 'sans-serif'],
        mono: ['Red Hat Mono', 'Consolas', 'monospace'],
        heading: ['Red Hat Display', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      animation: {
        // Smooth, professional animations for modern/minimal design
        "fade-in": "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'background-position-spin': 'background-position-spin 3s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-x": {
          "0%, 100%": { 
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": { 
            "background-size": "200% 200%",
            "background-position": "right center"
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'background-position-spin': {
          '0%': {
            'background-position': 'top center',
          },
          '100%': {
            'background-position': 'bottom center',
          },
        },
        'marquee': {
          'from': {
            transform: 'translateX(0)',
          },
          'to': {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          'from': {
            transform: 'translateY(0)',
          },
          'to': {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
          },
        },
      }),
    },
  },
}

export default config
