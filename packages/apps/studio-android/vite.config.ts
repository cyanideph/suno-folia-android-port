import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist",  // Output to project root dist/
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    host: true,
    strictPort: true,
  },
});