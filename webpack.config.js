const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = [{
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? [new webpack.HotModuleReplacementPlugin()] : [
      new UglifyJsPlugin({ sourceMap: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ]),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Resolve',
      template: path.join(__dirname, 'src/index.ejs'),
    })],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: process.env.NODE_ENV !== 'production' ? ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/index.jsx'] : ['./src/indexProd.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV !== 'production' ? '/' : '/resolve/js/', // virtual directory name where output will be served on devserver
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|xml|ico)$/,
      loader: 'url-loader',
    }],
  },
}];

