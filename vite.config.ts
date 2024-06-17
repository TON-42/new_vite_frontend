import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import {configDefaults} from "vitest/config";
import "@testing-library/jest-dom"; // Directly import the setup

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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
});
