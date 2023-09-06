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
    fallback: {
      path: require.resolve("path-browserify"),
      url: require.resolve("url/")
    },
    alias: {
      "dragonBones.min.js": path.resolve(__dirname, "core/dragonBones.min.js"),
      "pixi.js": path.resolve(__dirname, "core/pixi.js"),
      "ts@/kuni": path.resolve(__dirname, "js/game")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    minimize: true
  }
};
