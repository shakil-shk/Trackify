/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        "primary-light": "#A78BFA",
        "primary-dark": "#5B21B6",
        secondary: "#06B6D4",
        accent: "#F59E0B",
        success: "#10B981",
        danger: "#EF4444",
        surface: "#0F0F1A",
        "surface-2": "#1A1A2E",
        "surface-3": "#16213E",
        "surface-card": "#1E1E35",
        "text-primary": "#F8F8FF",
        "text-secondary": "#A0A0C0",
        "text-muted": "#6B6B8A",
        border: "#2D2D4A",
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.3)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 40px rgba(124, 58, 237, 0.2)",
      },
      backgroundImage: {
        "gradient-purple": "linear-gradient(135deg, #7C3AED, #5B21B6)",
        "gradient-cyan": "linear-gradient(135deg, #06B6D4, #0891B2)",
        "gradient-success": "linear-gradient(135deg, #10B981, #059669)",
        "gradient-danger": "linear-gradient(135deg, #EF4444, #DC2626)",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, rgba(124,58,237,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6,182,212,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(124,58,237,0.1) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
