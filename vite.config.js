// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.vswebdesign.online",

      // 1. Eliminamos por completo la clave 'robots'.
      //    Dejaremos que el archivo que creaste en /public/robots.txt
      //    sea la única fuente de verdad, eliminando el conflicto.

      // 2. Corregimos las rutas para que coincidan con las de React Router.
      //    El plugin encontrará automáticamente la ruta raíz '/',
      //    así que solo necesitamos añadir las otras.
      dynamicRoutes: [
        "/sobre-nosotros",
        "/politica-de-privacidad",
        "/terminos-y-condiciones",
      ],
    }),
  ],
});
