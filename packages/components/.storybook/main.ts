import { StorybookConfig } from "@storybook/react-webpack5";
import { dirname, join, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-styling-webpack"),
    {
      name: getAbsolutePath("storybook-css-modules"),
      options: {
        cssModulesLoaderOptions: {
          importLoaders: 1,
          modules: {
            localIdentName: "[folder]_[local]__[hash:base64:5]",
          },
        },
      },
    },
    "@storybook/addon-webpack5-compiler-swc",
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {},
    },
  },
  webpackFinal: async config => {
    (config.module?.rules ?? []).push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: {
                "tailwindcss/nesting": {},
                tailwindcss: {},
                "postcss-preset-env": {},
                cssnano: {},
                autoprefixer: {},
              },
            },
          },
        },
      ],
      include: resolve(__dirname, "../"),
    });
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
