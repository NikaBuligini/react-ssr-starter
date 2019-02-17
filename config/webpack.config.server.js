const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true'
const isProduction = process.env.NODE_ENV === 'production'
const publicPath = paths.servedPath
const env = getClientEnvironment(publicPath)

module.exports = {
  target: 'node',
  node: { __dirname: true },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map',
  entry: paths.serverIndexJs,
  output: {
    path: path.resolve(paths.appBuild),
    pathinfo: !isProduction,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: { limit: 10000, emitFile: false /* alreadt emitted during client-side bundling */ }
      },
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx)$/,
            exclude: /[\\/](node_modules)[\\/]/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: isProduction,
              compact: isProduction
            }
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/, /\.txt$/, /\.xml$/],
            options: { 
              name: 'media/[name].[hash:8].[ext]', 
              publicPath: publicPath, 
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(), 
    new webpack.DefinePlugin(env.stringified),
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [
      // terser settings from create react app 2
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap
      }),
    ]
  }
}