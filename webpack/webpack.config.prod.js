const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = {
  mode: 'production',
  target: 'web',
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/client/entry.js')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client/assets'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].chunk.[chunkhash:8].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/](node_modules)[\\/]/,
        loader: 'babel-loader',
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
        default: false,
        vendors: {
          test: /[\\/](node_modules)[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin(),
    new AsyncChunkNames(),
  ],
};

const serverConfig = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/server/entry.js')],
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    chunkFilename: 'ssr.[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/](node_modules|dist)[\\/]/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|txt|woff2?)$/i,
        loader: 'file-loader?name=assets/images/[name].[ext]&emitFile=false',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?name=assets/fonts/[name].[ext]&emitFile=false',
      },
    ],
  },
  plugins: [new AsyncChunkNames(), new MiniCssExtractPlugin()],
};

module.exports = {
  clientConfig,
  serverConfig,
};
