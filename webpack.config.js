var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const VENDOR_LIBS = [
    "react",
    "react-dom",
    "react-router"
];

var path = require('path');
// var serverConfig = {
//   entry: {
//     server: './src/server/server.js'
//   },
//   target: 'node',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js'
//   },
//   module: {
//     rules: [
//       {
//         use: 'babel-loader',
//         test: /\.js$/,
//         exclude: /node_modules/
//       }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//     })
//   ]
// };

var clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  entry: {
    bundle: './src/client/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

// module.exports = [ serverConfig, clientConfig ];
module.exports = clientConfig;