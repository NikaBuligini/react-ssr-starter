const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true'
const isProduction = process.env.NODE_ENV === 'production'
const publicPath = paths.servedPath
const env = getClientEnvironment(publicPath)

module.exports =  {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map',
  entry: [
    !isProduction && 'webpack-hot-middleware/client?path=/__webpack_hmr',
    paths.appIndexJs
  ].filter(Boolean),
  output: {
    path: path.resolve(paths.appBuild, 'client'),
    pathinfo: !isProduction,
    filename: isProduction ? 'js/[name].[chunkhash:8].js' : 'app.bundle.js',
    chunkFilename: isProduction ? 'js/[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isProduction ? publicPath : '/' // always serve from '/' in development
  },
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        include: paths.appSrc,
        exclude: /[\\/](node_modules)[\\/]/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: 'react-dev-utils/eslintFormatter',
              eslintPath: 'eslint'
            },
          },
        ],
      },
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: { limit: 10000 /* 10KB */ }
          },
          {
            test: /\.(js|mjs|jsx)$/,
            include: paths.appSrc,
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
              publicPath: publicPath 
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    !isProduction && new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({ fileName: path.join(__dirname, '../build/asset-manifest.json') }),
    new ReactLoadablePlugin({ filename: path.join(__dirname, '../build/react-loadables.json') }),
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
          mangle: {
            safari10: true
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
    ],
    // splitChunks settings from create react app 2
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: isProduction ? {
      chunks: "all",
      name: false
    } : false,
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: isProduction
  }
}
