const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const env = require('./env')();

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      'react-error-overlay',
      path.resolve(__dirname, '../src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.[chunkhash:8].js',
    publicPath: env.raw.PUBLIC_URL + '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /[\\/](node_modules)[\\/]/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.parseForDefinePlugin),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(), // To debug pass { debug: true }
    new LodashModuleReplacementPlugin({ caching: true }),
    new ReactLoadablePlugin({
      filename: path.join(__dirname, '../dist/reactLoadable.json'),
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
