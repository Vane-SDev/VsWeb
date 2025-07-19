// Archivo: eslint.config.js (Versión Final y Corregida)

import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react'; // <-- 1. IMPORTAMOS EL PLUGIN QUE FALTABA
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(["dist"]),

  // --- Bloque 1: Configuración para tu código de React (Frontend) ---
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      'react': reactPlugin, // <-- 2. AÑADIMOS EL PLUGIN A LA CONFIGURACIÓN
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    // SOLUCIÓN: Añadimos las reglas recomendadas de React
    // y desactivamos las que ya no son necesarias en React 17+
    rules: {
      // --- REGLAS BASE ---
      // Advertimos sobre variables no usadas, pero ignoramos 'React' porque el nuevo JSX no lo requiere explícitamente.
      'no-unused-vars': ['warn', { "varsIgnorePattern": "^React$" }],

      // --- REGLAS DE REACT (¡ESTA ES LA MAGIA!) ---
      // Con esto, ESLint entiende que <FaWhatsapp /> es un uso válido de la variable 'FaWhatsapp'.
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // No se necesita 'import React' en cada archivo
      'react/prop-types': 'off', // Desactivamos la validación de prop-types si no la usas

      // --- REGLAS DE HOOKS Y REFRESH ---
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },

  // --- Bloque 2: Configuración para tus funciones (Backend) ---
  {
    files: ["netlify/functions/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);