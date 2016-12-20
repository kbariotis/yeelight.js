import { assert } from 'chai';
import Store from '../src/store';

describe('Store', () => {
  it('should not allow instantiation of Store', (done) => {

    try {
      const store = new Store();
    } catch (e) {
      done();
    }
  });
});
