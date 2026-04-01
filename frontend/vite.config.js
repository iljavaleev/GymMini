import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, },
  server: {
      cors: {
        origin: 'http://localhost:3000',
    },
  }
});

