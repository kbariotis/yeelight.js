import winston from 'winston';

class Logger {

  constructor(options) {
    this.options = Object.assign({
      enabled: true,
    }, options);
    this.logger = winston;
  }

  info(msg) {
    if (!this.options.enabled) {
      return;
    }
    this.logger.info(msg);
  }
}

export default Logger;
