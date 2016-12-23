/* @flow */

import winston from 'winston';

/**
 * Logger class
 */
class Logger {

  options: Object;
  logger: winston;

  /**
   * Constructor
   */
  constructor(options: { enabled: boolean }) {
    this.options = Object.assign({
      enabled: true,
    }, options);
    this.logger = winston;
  }

  /**
   * Log an info message
   */
  info(msg: string): void {
    if (!this.options.enabled) {
      return;
    }
    this.logger.info(msg);
  }
}

export default Logger;
