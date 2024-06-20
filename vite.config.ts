/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import {configDefaults} from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"', // Adjust the pattern as needed
      },
    }),
  ],
  esbuild: {
    target: "esnext", // Use the latest supported environment for top-level await
  },
  test: {
    globals: true,
    environment: "node", // Default environment
    environmentMatchGlobs: [
      // Use jsdom for tests in the 'components' directory
      ["src/components/**/*.test.tsx", "jsdom"],
    ],
    exclude: [
      ...configDefaults.exclude,
      "dist/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
    ],
  },
});
