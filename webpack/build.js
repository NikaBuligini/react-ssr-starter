/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const { clientConfig } = require('./webpack.config.prod');
const { serverConfig } = require('./webpack.config.prod');

rimraf.sync(path.resolve(__dirname, '../dist'));

webpack(clientConfig).run();
webpack(serverConfig).run();
