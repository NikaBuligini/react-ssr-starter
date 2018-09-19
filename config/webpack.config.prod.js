const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const env = require('./env')();

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].[chunkhash:10].js',
    chunkFilename: 'assets/js/[name].chunk.[chunkhash:10].js',
    publicPath: env.raw.PUBLIC_URL + '/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /[\\/](node_modules)[\\/]/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.parseForDefinePlugin),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin(), // To debug pass { debug: true }
    new LodashModuleReplacementPlugin(),
    new ManifestPlugin({
      fileName: path.join(__dirname, '../dist/asset-manifest.json'),
    }),
    new ReactLoadablePlugin({
      filename: path.join(__dirname, '../dist/reactLoadable.json'),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.(js|jsx)(\?.*)?$/,
        parallel: true,
        terserOptions: {
          ecma: 5,
          safari10: true,
        },
      }),
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
