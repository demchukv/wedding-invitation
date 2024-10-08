import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      cormorant: ["var(--font-cormorant)", ...fontFamily.serif],
      ubuntu: ["var(--font-ubuntu)", ...fontFamily.sans],
    },
    extend: {
      screens: {
        'max-md': { 'max': '768px' }
      },
      colors: {
        mblack: "var(--m-black)",
        mbrown: "var(--m-brown)",
        mdarkbrown: "var(--m-dark-brown)",
        mlightbrown: "var(--m-light-brown)",
        mbtnhover: "var(--mbtnhover)",
        mlightgreybg: "var(--m-light-grey-background)",
        mlightgrey50: "hsl(var(--m-light-grey-background-50))",
        mpink: "var(--m-pink)",
        mgrey: "var(--m-grey)",
        mlightgrey: "var(--m-light-grey)",
        mred: "var(--m-red)",
        mgreen: "var(--m-green)",

        btnbgstart: "var(--btn-bg-start)",
        btnbgend: "var(--btn-bg-end)",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      boxShadow: {
        outerbtn: "0px 4px 8px 0px #61110640",
        innerbtn: "inset 0px 0px 0px 0.5px #2D0C03",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
