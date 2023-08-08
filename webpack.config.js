const path = require("path");
const webpack = require("webpack");
const progressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  devtool: "cheap-source-map",
  entry: path.resolve("./", "js/game/main.ts"),
  output: {
    path: path.resolve("./", "dist"),
    filename: "main.min.js",
    library: "WXMiniGameTs",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /(.ts)$/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /(.js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: [new progressBarPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
