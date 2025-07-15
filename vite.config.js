// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap"; 

export default defineConfig({
  plugins: [
    react(),
    sitemap({
  
      hostname: "https://www.vswebdesign.online",

      
      dynamicRoutes: ["/servicios", "/proyectos", "/testimonios", "/contacto"],
    }),
  ],
});
