/* eslint-disable no-console */

const chalk = require('chalk');

const logger = urls => {
  console.log(`
Localhost: ${chalk.magenta(urls.localUrlForTerminal)}
      LAN: ${chalk.magenta(urls.lanUrlForTerminal)}
      PID: ${chalk.magenta(process.pid)}\n
${chalk.blue(`Press ${chalk.italic('CTRL-C or CTRL-SHIFT-C')} to stop`)}
    `);
};

export default logger;
