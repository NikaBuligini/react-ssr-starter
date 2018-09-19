/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const shrinkRay = require('shrink-ray');
const helmet = require('helmet');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const handleRequest = require('./handleRequest').default;
const webpackDevConfig = require('../config/webpack.config.dev');
const compiler = webpack(webpackDevConfig);

const app = express();

if (process.env.PUBLIC_URL === undefined) {
  process.env.PUBLIC_URL = '';
  console.log('PUBLIC_URL: ', 'If something does not work, check PUBLIC_URL');
}

app.use(shrinkRay()); // compress all requests
app.use(helmet()); // security reasons. !different from react-helmet!

app.use(
  process.env.PUBLIC_URL,
  express.static(path.join(__dirname, '../dist'), {
    maxage: '10 days',
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(
    devMiddleware(compiler, {
      hot: true,
      publicPath: webpackDevConfig.output.publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        chunks: false,
        modules: false,
        hash: false,
      },
    }),
  );

  app.use(
    hotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 4000,
    }),
  );
}

app.get('*', handleRequest);

export default app;
