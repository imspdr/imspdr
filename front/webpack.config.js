const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
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
  ],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
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
    proxy: {
      "/back": {
        target: "http://localhost:5000",
        pathRewrite: { "/back": "" },
      },
    },
    historyApiFallback: true,
    host: "localhost",
    port: 4545,
  },
};
