const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          "babel",
        ],
        include: path.resolve(__dirname, "src"),
      },

      {
        test: /\.css$/,
        loaders: [
          "style",
          "css",
        ],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
