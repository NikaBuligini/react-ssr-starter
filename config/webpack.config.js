const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true'
const isEnvProduction = process.env.NODE_ENV === 'production'
const publicPath = paths.servedPath
const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : ''
const env = getClientEnvironment(publicUrl)

module.exports =  {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map',
  entry: [paths.appIndexJs],
  output: {
    // path: isEnvProduction ? paths.appBuild : undefined,
    path: path.resolve(paths.appBuild, 'assets/js'),
    pathinfo: !isEnvProduction,
    filename: isEnvProduction ? '[name].[chunkhash:8].js' : '[name].bundle.js',
    chunkFilename: isEnvProduction ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isEnvProduction ? publicPath : '/'
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint')
            },
          },
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|mjs|jsx)$/,
            include: paths.appSrc,
            exclude: /[\\/](node_modules)[\\/]/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction
            }
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /[\\/](node_modules)[\\/]/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: false,
              sourceMaps: false
            }
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            issuer: {
              test: /\.jsx?$/
            },
            use: ['babel-loader', '@svgr/webpack', 'url-loader']
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader'
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/, /\.txt$/, /\.xml$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified)
  ],
  optimization: {
    minimize: isEnvProduction,
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
    splitChunks: {
      chunks: "all",
      name: false
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  }
}
