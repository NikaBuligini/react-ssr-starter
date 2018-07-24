/* eslint-disable no-console */
// Do this first so application gets it correctly at build timeerror
process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = '';

process.on('unhandledRejection', error => {
  throw error;
});

require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const { measureFileSizesBeforeBuild } = FileSizeReporter;
const { printFileSizesAfterBuild } = FileSizeReporter;
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const productionConfig = require('../config/webpack.config.prod');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

measureFileSizesBeforeBuild(resolvePath('../dist'))
  .then(previousFileSizes => {
    fse.emptyDirSync(resolvePath('../dist')); // Empty directory or create if existn't, dir itself never being deleted
    return buildOnPromise(previousFileSizes);
  })
  .then(
    // onResolve
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after build:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        resolvePath('../dist'),
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );
      console.log();
    },
    // onReject
    error => {
      console.log(chalk.red('Failed to compile.\n'));
      console.log((error.message || error) + '\n');
      process.exit(1);
    },
  );

function buildOnPromise(previousFileSizes) {
  console.log('Creating an optimized production build...');

  const compiler = webpack(productionConfig);

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }

      const messages = formatWebpackMessages(stats.toJson({}, true));

      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}
