const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const nodemon = require('nodemon');
const log = require('npmlog');
const rimraf = require('rimraf');
const { clientConfig, serverConfig } = require('./webpack.config.dev');

// rimraf.sync(path.resolve(__dirname, '../dist'));

let isServerStarted = false;
const startServer = () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    ignore: ['*'],
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: ['fake/'],
    ext: 'fakeext',
  });

  nodemon
    .on('quit', () => log.info('nodemon', 'stopped server. bye'))
    .on('exit', () => log.info('nodemon', 'nodemon exited'))
    .on('crash', () => log.info('nodemon', 'nodemon crashed'))
    .on('stderr', () => log.info('nodemon', 'nodemon stderr'))
    .on('restart', () => log.info('nodemon', 'patched server'));
};

const bundleServer = () => {
  let bundleStartTime;

  const serverCompiler = webpack(serverConfig);

  serverCompiler.plugin('compile', () => {
    log.info('webpack', 'Bundling server...\n');
    bundleStartTime = Date.now();
  });

  serverCompiler.plugin('done', () => {
    log.info('Webpack', `Bundled server in ${Date.now() - bundleStartTime}ms`);
    if (isServerStarted) {
      nodemon.restart();
    } else {
      isServerStarted = true;
      startServer();
    }
  });

  serverCompiler.run(error => {
    if (error) log.error(error);
  });
};

let clientBundleStartTime;

const clientCompiler = webpack(clientConfig);

clientCompiler.plugin('compile', () => {
  log.info('Webpack', 'Bundling client...');
  clientBundleStartTime = Date.now();
});

clientCompiler.plugin('done', () => {
  log.info('Webpack', `Bundled client in ${Date.now() - clientBundleStartTime}ms`);
  bundleServer();
});

new WebpackDevServer(clientCompiler, {
  hot: true,
  historyApiFallback: false,
  contentBase: path.resolve(__dirname, '../dist/client'),
  publicPath: clientConfig.output.publicPath,
  stats: { colors: true },
  quiet: false,
  noInfo: false,
}).listen(8080);

/* 
    work around a weird nodemon bug where something was logged to the console
    even after the process exited
*/
/* eslint-disable */
process.on('SIGINT', error => {
  if (error) console.log('Received SIGINT. Press Control-D to exit.\n', error.stack);
  process.exit();
});
