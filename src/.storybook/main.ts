import type {StorybookConfig} from "@storybook/react-vite";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const {mergeConfig} = await import("vite");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
    });
  },
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
};
export default config;
