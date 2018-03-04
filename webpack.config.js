const webpack = require('webpack')

const isProd = process.argv.indexOf('-p') !== -1

module.exports = {
  devtool: isProd ? false : 'eval',
  entry: './app/frontend/index.jsx',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: [__dirname + '/app/frontend'],
        exclude: [__dirname + '/node_modules']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [__dirname + '/app/frontend'],
        exclude: [__dirname + '/node_modules']
      }
    ]
  },
  plugins:[
    isProd ? (
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ) : (
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    )
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./app/frontend', 'node_modules'],
  },
}
