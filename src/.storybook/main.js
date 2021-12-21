const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js', '.vue']
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] },
    });
    
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
    };

    return config;
  },
}