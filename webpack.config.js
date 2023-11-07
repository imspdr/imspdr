const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "main.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.ejs"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.(css)?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("sass"),
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
          },
          {
            loader: "file-loader",
          },
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|ttf|mp3|ogg|wav|otf|woff|jpg|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 4545,
  },
};
