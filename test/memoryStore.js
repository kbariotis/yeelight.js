import { expect } from 'chai';
import MemoryStore from '../src/memoryStore';
import Device from '../src/device';

describe('MemoryStore', () => {

  it('should be able to instantiate', () => {

    const store = new MemoryStore();
    expect(store).to.be.an.instanceof(MemoryStore);
  });

  it('should get all devices', () => {

    const store = new MemoryStore();
    expect(store.get()).to.have.length(0);
  });

  it('should add a device', () => {

    const store = new MemoryStore();
    store.add(new Device({
      id: 'ID',
      address: '192.168.1.23',
      port: '30132'
    }));
    expect(store.get()).to.have.length(1);
  });

  it('should not allow to add a duplicate id', () => {

    const store = new MemoryStore();
    store.add(new Device({
      id: 'ID',
      address: '192.168.1.23',
      port: '30132'
    }));
    expect(store.get()).to.have.length(1);
  });

  it('should get a device by id', () => {

    const store = new MemoryStore();
    store.add(new Device({
      id: 'ID',
      address: '192.168.1.23',
      port: '30132'
    }));
    expect(store.getById('ID')).to.have.property('id').and.to.equals('ID');
  });

  it('should remove device by id', () => {

    const store = new MemoryStore();
    store.removeById('ID');
    expect(store.get()).to.have.length(0);
  });
});
