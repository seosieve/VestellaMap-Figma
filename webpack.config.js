const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/code.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, '.'),
    library: {
      name: 'VestellaMap',
      type: 'var',
    },
  },
  optimization: {
    minimize: false,
  },
  externals: {
    '@figma/plugin-typings': 'figma',
  },
}; 