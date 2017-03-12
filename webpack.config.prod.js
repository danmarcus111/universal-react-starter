var webpack = require('webpack');
var path = require('path');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");

const VENDOR_LIBS = [
    "react",
    "react-dom",
    "react-router"
];

module.exports = {
  target: 'web',
  entry: {
    bundle: './src/client/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader"
      },
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
