const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        /**
         * ts-loader uses tsc, the TypeScript compiler, and relies on your tsconfig.json configuration.
         * Make sure to avoid setting module to "CommonJS", or webpack won't be able to tree-shake your code.
         */
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {
  //   static: path.join(__dirname, "dist"),
  // },
  // optimization: {
  //   runtimeChunk: "single",
  // },
  // plugins: [new BundleAnalyzerPlugin()],
};
