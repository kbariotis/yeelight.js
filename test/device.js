import { expect } from 'chai';
import Device from '../src/device';

describe('Device', () => {
  it('should be able to instantiate', () => {
    const device = new Device({
      id: '1234',
      address: '192.168.0.11',
      port: 55443,
    });
    expect(device).to.be.an.instanceof(Device);
  });

  it('should require payload', () => {
    try {
      const device = new Device();
    } catch(e) {
      expect(e).to.be.an.instanceof(TypeError);
    }
  });

  it('should accept payload', () => {
    const device = new Device({
      id: '1234',
      address: '192.168.0.11',
      port: 55443,
    });
    expect(device.id).to.equal('1234');
  });

  it.skip('should connect to device');
});
