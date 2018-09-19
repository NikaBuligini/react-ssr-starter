/* eslint-disable no-console */

require('babel-core/register')({
  plugins: ['syntax-dynamic-import'],
});

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

const clearConsole = require('react-dev-utils/clearConsole');
const { choosePort, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const Loadable = require('react-loadable');

const app = require('../server/app').default;
const logger = require('./utils/logger').default;

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (!port) {
      return;
    }

    const urls = prepareUrls('http', HOST, port);

    Loadable.preloadAll().then(() => {
      app.listen(port, HOST, error => {
        if (error) {
          console.error(error);
        }

        if (isInteractive) {
          clearConsole();
        }

        logger(urls);
      });
    });
  })
  .catch(error => {
    console.error(error);
  });
