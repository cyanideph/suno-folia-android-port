import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "LyricCore",
      formats: ["es", "umd"],
      fileName: (format) => `@suno-folia/lyric-core.${format}.js`,
    },
  },
  server: {
    host: true,
    strictPort: true,
  },
});