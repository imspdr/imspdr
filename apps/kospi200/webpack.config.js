const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/kospi200/' : 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@imspdr/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@imspdr/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'kospi200',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'] },
        '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'] },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: path.resolve(__dirname, '../../imspdr.png'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/data', to: 'data', noErrorOnMissing: true }],
    }),
  ],
  devServer: {
    port: 3200,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
