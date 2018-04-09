const path = require('path');
const merge = require('webpack-merge');

const devServerOptions = process.argv.find(arg => arg.includes('webpack-dev-server'))
  ? {
    devServer: { headers: { 'Access-Control-Allow-Origin': '*' } },
    devtool: 'eval-source-map',
    output: { publicPath: 'http://0.0.0.0:8080/' },
  }
  : {};

module.exports = merge({
  entry: path.join(__dirname, 'app/frontend/index.jsx'),
  output: { path: path.join(__dirname, 'public') },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./app/frontend', 'node_modules'],
  },
}, devServerOptions);
