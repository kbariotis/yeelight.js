import { assert } from 'chai';
import yeelight from '../src/yeelight';
import dgram from 'dgram';

describe('Awesome test.', () => {
  it('should send discovery multicast packet', (done) => {

    yeelight
      .discover()
      .then((devices) => {

        assert.equal(devices.length, 1, 'what??');
        done();
      })
      .catch((err) => done(err));

      const message = new Buffer(require('./response'));
      const client = dgram.createSocket('udp4');
      client.send(message, 43210, '0.0.0.0', () => client.close());
  });
});
