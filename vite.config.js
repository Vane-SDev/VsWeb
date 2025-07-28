// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ¡Ya no importamos sitemap!

export default defineConfig({
  plugins: [
    react(),
    // ¡Hemos eliminado el plugin sitemap de aquí!
  ],
});
