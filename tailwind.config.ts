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
          navy: "#0A1128", // Deep luxury obsidian navy
          navyDeep: "#060A17",
          navySurface: "#10182E",
          ink: "#090A0F", // Deep rich black
          surface: "#FAFAFC",
          card: "#FFFFFF",
          muted: "#64748B",
          border: "#E2E8F0",
          borderDark: "#1E293B",
          whatsapp: "#25D366", // Official WhatsApp green
          whatsappDark: "#1EBE5D",
          accent: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.15em",
        ultra: "0.25em",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px 0 rgba(10, 17, 40, 0.04), 0 1px 2px -1px rgba(10, 17, 40, 0.02)",
        hover: "0 12px 30px -10px rgba(10, 17, 40, 0.08)",
        elevated: "0 25px 50px -12px rgba(10, 17, 40, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
