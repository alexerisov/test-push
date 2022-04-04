import chalk from 'chalk';
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red
};

const nextAuthLog = log;
const axiosLog = log.getLogger('axios');

export function loggerSetup() {
  prefix.reg(log);
  log.enableAll();

  applyPrefix(log, chalk.green);
  applyPrefix(log.getLogger('next-auth'), chalk.blue);
  applyPrefix(log.getLogger('axios'), chalk.magenta);
}

function applyPrefix(logger, color) {
  prefix.apply(logger, {
    format(level, name, timestamp) {
      return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${color.bold(
        `${name.toUpperCase()}:`
      )}`;
    }
  });
}
