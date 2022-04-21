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

const nextAuthLog = log.getLogger('next-auth');
const axiosLog = log.getLogger('axios');

export function loggerSetup() {
  prefix.reg(log);
  if (process.env.DEBUG) {
    log.enableAll();
    nextAuthLog.setLevel('error');
    axiosLog.setLevel('error');
  }

  applyPrefix(log, chalk.green);
  applyPrefix(nextAuthLog, chalk.blue);
  applyPrefix(axiosLog, chalk.magenta);
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
