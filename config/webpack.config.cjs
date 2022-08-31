const path = require("path");
const webpack = require("webpack");

const pkg = require("../package.json");

const mode = process.env.NODE_ENV;
const externals = {};

Object.keys(pkg.peerDependencies).forEach((dep) => {
  externals[dep] = dep;
});

const config = {
  mode,
  entry: path.resolve(__dirname, "../src/index.ts"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: { type: "module" },
    environment: { module: true },
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules", "src"],
    // fallback: {
    //   util: false,
    // },
  },
  externals,
  plugins: [
    /*
      The BannerPlugin is used to inject a `process.env.NODE_ENV` check into the bundle after webpack is done transpiling/building.
      
      The default behavior of webpack is to transform any `process.env.NODE_ENV` declarations at build time,
      but we want `__DEV__` to be evaluated at runtime within consuming apps.
      In order to avoid that build-time evaluation, we need to inject this constant AFTER webpack is done transpiling.
      
      Note: you could tell webpack to skip transpiling `process.env.NODE_ENV` via `optimization: {nodeEnv: false}`...
      however, this also means that webpack wont transpile `process.env.NODE_ENV` within the node_modules. 
      This leads certain `process.env.NODE_ENV` checks in MUI and React to explode when evaluated within Nextiva Connect,
      so to avoid having to fix 1036 things in Connect we just use this workaround that is restricted to the next-ui-components themselves.
    */
    new webpack.BannerPlugin({
      banner: 'const __DEV__ = process?.env?.NODE_ENV !== "production";',
      raw: true,
    }),
  ],
};

module.exports = config;
