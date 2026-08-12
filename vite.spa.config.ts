import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Standalone SPA build for Vercel.
// Does NOT use TanStack Start / Cloudflare plugins — the app's real routing
// lives in react-router-dom inside src/App.tsx, so we ship it as a pure SPA.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-spa",
    emptyOutDir: true,
    sourcemap: false,
  },
});
