import { expect } from 'chai';
import Logger from '../src/logger';

describe('Logger', () => {
  it('should be able to instantiate', () => {
    const logger = new Logger();
    expect(logger).to.be.an.instanceof(Logger);
  });

  it('should have default options', () => {
    const logger = new Logger();
    expect(logger.options.enabled).to.be.true;
  });

  it('should accept options', () => {
    const logger = new Logger({enabled: false});
    expect(logger.options.enabled).to.be.false;
  });
});
