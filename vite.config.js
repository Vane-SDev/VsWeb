import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.vswebdesign.online",
      generateRobotsTxt: true,
      robots: [ ],
      dynamicRoutes: [
        "/",
        "/servicios",
        "/proyectos",
        "/testimonios",
        "/contacto",
      ],
      exclude: ["/syjxlwfuc9abb9kq9v80wlcyk57d9l"],
    }),
  ],
});
