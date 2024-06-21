# Vitest Configuration

1. **`globals: true`**:

   - This option makes Vitest's testing functions (like `describe`, `it`, `test`, `expect`, etc.) available globally without needing to import them in each test file. This simplifies your test files and makes the syntax cleaner and more similar to Jest.

2. **`environment: 'jsdom'`**:

   - Specifies the testing environment for Vitest. The `jsdom` environment simulates a browser-like environment in Node.js, allowing you to test DOM manipulations and other browser APIs. This is particularly useful for testing React components and other code that interacts with the DOM.

3. **`setupFiles: './src/setupTests.ts'`**:
   - Points to a setup file that Vitest will run before any tests. This file is typically used to configure global settings, set up mocks, or perform other initializations needed for your tests. In your case, `./src/setupTests.ts` is used to mock the Telegram WebApp object and any other necessary global setups.

### Configuration in Context

```typescript
/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

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
    setupFiles: "./src/setupTests.ts",
  },
});
```

### Detailed Breakdown of Each Option

- **Globals: True**

  - **Purpose**: Simplifies the test syntax by making Vitest functions globally available.
  - **Usage**:

    ```typescript
    // Without globals
    import {describe, it, expect} from "vitest";

    describe("MyComponent", () => {
      it("should render", () => {
        // Test logic here
      });
    });

    // With globals
    describe("MyComponent", () => {
      it("should render", () => {
        // Test logic here
      });
    });
    ```

- **Environment: 'jsdom'**

  - **Purpose**: Allows testing of code that interacts with the DOM by providing a browser-like environment in Node.js.
  - **Usage**:
    ```typescript
    // Example test that requires a DOM environment
    it("should render a button", () => {
      const button = document.createElement("button");
      button.textContent = "Click me";
      document.body.appendChild(button);
      expect(button.textContent).toBe("Click me");
    });
    ```

- **Setup Files: './src/setupTests.ts'**

  - **Purpose**: Runs setup code before any tests, useful for global configurations, mocks, or polyfills.
  - **Usage**:

    ```typescript
    // src/setupTests.ts
    import "@testing-library/jest-dom";
    import {vi} from "vitest";

    // Mock the getUserDataFromTelegram function
    vi.mock("./utils/utils", () => ({
      ...vi.importActual("./utils/utils"),
      getUserDataFromTelegram: vi.fn(() => ({
        id: 1, // or 2, or 3 depending on the test case
        name: "Test User",
      })),
    }));

    // Mock the Telegram WebApp object on the window
    global.window.Telegram = {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: 123456,
            first_name: "Test",
            last_name: "User",
          },
        },
        ready: vi.fn(),
      },
    };
    ```

### Running the Tests

To run your tests with Vitest, add the following script to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run your tests using:

```bash
npm run test
```
