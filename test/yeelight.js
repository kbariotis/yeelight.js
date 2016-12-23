import { expect } from 'chai';
import Yeelight from '../src/yeelight';
import Device from '../src/device';
import dgram from 'dgram';

describe('Yeelight', () => {
  it('should be able to instantiate', () => {
    const yeelight = new Yeelight();
    expect(yeelight).to.be.an.instanceof(Yeelight);
  });

  it('should have default options', () => {
    const yeelight = new Yeelight();
    expect(yeelight.options.verbose).to.be.true;
  });

  it('should accept options', () => {
    const yeelight = new Yeelight({verbose: false});
    expect(yeelight.options.verbose).to.be.false;
  });

  it('should send discovery multicast packet', (done) => {
    const yeelight = new Yeelight({verbose: false, discoveryTimeout: 100});

    yeelight
      .discover(100)
      .then((devices) => {

        expect(devices.length).to.equal(1);
        done();
      })
      .catch((err) => done(err));

      const message = new Buffer(require('./response'));
      const client = dgram.createSocket('udp4');
      client.send(message, 43210, '0.0.0.0', () => client.close());
  });

  it('should listen for advertisement packets', (done) => {
    const yeelight = new Yeelight({verbose: false, discoveryTimeout: 100});

    yeelight.watch();
    yeelight.on('device', (device) => {

      expect(device).to.be.an.instanceof(Device);
      expect(yeelight.store.get()).to.have.length(1);
      yeelight.stop();
      done();
    });

    const message = new Buffer(require('./advertisment'));
    const client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, 1982, '239.255.255.250', () => client.close());
  });
});
