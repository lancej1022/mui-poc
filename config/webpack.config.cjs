const path = require("path");

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
    // library: { name: "@company/components", type: "umd", umdNamedDefine: true }, // uncomment to switch to UMD
    library: { type: "module" }, // comment out to switch to UMD
    environment: { module: true }, // comment out to switch to UMD
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  // comment out to switch to UMD
  experiments: {
    outputModule: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader", // can be switched to babel-loader as well, shouldnt make a difference
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".css", ".scss", ".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: ["node_modules", "src"],
  },
  externals,
};

module.exports = config;
