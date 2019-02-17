/* eslint-disable no-console */

import path from 'path'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import handleRequest from './handleRequest'
import webpackClientConfig from '../config/webpack.config'

const compiler = webpack(webpackClientConfig)
const app = express()

app.use(compression()) // compress all requests
app.use(helmet()) // security reasons. !different from react-helmet!
app.use(
  webpackClientConfig.output.publicPath,
  express.static(path.join(__dirname, '../build/client'), { maxage: '20 days' })
)

if (process.env.NODE_ENV === 'development') {
  app.use(
    devMiddleware(compiler, {
      hot: true,
      publicPath: webpackClientConfig.output.publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        chunks: false,
        modules: false,
        hash: false
      }
    })
  )

  app.use(
    hotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 2000
    })
  )
}

app.get('*', handleRequest)

export default app
