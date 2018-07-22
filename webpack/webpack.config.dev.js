const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const clientConfig = {
  mode: 'development',
  target: 'web',
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
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/](node_modules)[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(__dirname, '../public/template.html'),
      filename: path.resolve(__dirname, '../dist/client/template.html'),
    }),
    new HtmlWebpackHarddiskPlugin(), // To force emit html in dist folder with already injected bundled files in dev
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
    app: ['babel-polyfill', path.resolve(__dirname, '../src/server/entry.js')],
  },
  node: {
    __dirname: false,
    __filename: false,
    console: true,
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    chunkFilename: '[name].[chunkhash:8].js',
    libraryTarget: 'commonjs2',
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
        use: 'file-loader?name=/assets/images/[name].[ext]&emitFile=false',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?name=/assets/fonts/[name].[ext]&emitFile=false',
      },
    ],
  },
  plugins: [new AsyncChunkNames()],
};

module.exports = {
  clientConfig,
  serverConfig,
};
