const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/interface/ui.tsx', // The entry point for your UI code
    code: './src/util/code.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/interface/ui.html',
      filename: 'ui.html',
      chunks: ['ui'],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
