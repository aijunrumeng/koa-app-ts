const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ProgressPlugin = require('progress-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = 'production';

module.exports = {
  mode,
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'package.json', to: 'package.json' },
        { from: 'pm2.config.js', to: 'pm2.config.js' },
      ],
    }),
    new ProgressPlugin(true),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve('src'),
    },
  },
};
