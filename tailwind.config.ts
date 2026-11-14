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
          navy: "#101828",
          blue: "#2563EB",
          blueHover: "#1D4ED8",
          surface: "#F8FAFC",
          text: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          whatsapp: "#25D366",
          whatsappHover: "#20BA5A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05)",
        card: "0 4px 6px -1px rgba(16, 24, 40, 0.08), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        cardHover: "0 12px 24px -4px rgba(16, 24, 40, 0.12), 0 4px 6px -2px rgba(16, 24, 40, 0.04)",
        elevated: "0 20px 30px -6px rgba(16, 24, 40, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
