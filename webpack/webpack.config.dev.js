const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const clientConfig = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.resolve(__dirname, '../src/client/entry.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client/assets'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/](node_modules)[\\/]/,
        loader: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|txt|woff2?)$/i,
        use: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/](node_modules)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/template.html'),
      filename: path.resolve(__dirname, '../dist/client/template.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new AsyncChunkNames(),
  ],
};

const serverConfig = {
  mode: 'development',
  target: 'node',
  entry: {
    app: [
      'webpack/hot/signal.js',
      'babel-polyfill',
      path.resolve(__dirname, '../src/server/entry.js'),
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2', // The most important part is to set commonjs2 for node server
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/](node_modules|dist)[\\/]/,
        use: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.(jpe?g|png|gif|svg|txt|woff2?)$/i,
        use: 'file-loader?name=images/[name].[ext]$emitFile=false',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?name=fonts/[name].[ext]$emitFile=false',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({
      filename: path.join(__dirname, '../src/server/react-loadable.json'), // Stuff for dynamic import and code splitting for server
    }),
  ],
};

module.exports = {
  clientConfig,
  serverConfig,
};
