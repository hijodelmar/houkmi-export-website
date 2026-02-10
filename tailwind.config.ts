import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#7CB342", // Lime Green - Fresh lettuce, vibrant growth
            light: "#9CCC65",
            dark: "#558B2F",
          },
          orange: {
            DEFAULT: "#FF6F00", // Bright Orange - Juicy oranges, energy
            light: "#FF9800",
            dark: "#E65100",
          },
          red: {
            DEFAULT: "#FF5252", // Tomato Red - Ripe tomatoes, passion
            light: "#FF7979",
            dark: "#E53935",
          },
          yellow: {
            DEFAULT: "#FFD600", // Sunny Yellow - Bananas, sunshine
            light: "#FFEA00",
            dark: "#FFC400",
          },
          purple: {
            DEFAULT: "#AB47BC", // Berry Purple - Grapes, premium
            light: "#BA68C8",
            dark: "#8E24AA",
          },
          mint: {
            DEFAULT: "#26A69A", // Mint Green - Freshness, clean
            light: "#4DB6AC",
            dark: "#00897B",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-fresh": "linear-gradient(135deg, #7CB342 0%, #FF6F00 50%, #FFD600 100%)",
        "gradient-sunset": "linear-gradient(135deg, #FF6F00 0%, #FF5252 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 179, 66, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 179, 66, 0.8)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
