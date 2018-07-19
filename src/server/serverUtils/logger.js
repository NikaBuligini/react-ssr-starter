/* eslint-disable no-console */

import chalk from 'chalk';
import ip from 'ip';

const divider = chalk.gray('\n-----------------------------------');

const logger = {
  error: error => {
    console.error(chalk.red(error));
  },

  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}
      PID: ${chalk.magenta(process.pid)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C or CTRL-SHIFT-C')} to stop`)}
    `);
  },
};

export default logger;
