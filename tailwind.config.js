module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: { container: { center: true, padding: "1rem" } },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
