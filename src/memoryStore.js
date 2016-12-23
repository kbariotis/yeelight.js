/** @flow */

import Store from './store';
import Device from './device';

/**
 * Memory store for Yeelight devices
 */
class MemoryStore extends Store {

  devices: Array<Device>

  /**
   * Constructor
   */
  constructor() {
    super();
    this.devices = [];
  }

  /**
   * Add a Device to the store
   */
  add(device: Device): void {
    if (!this.getById(device.id)) {
      this.devices.push(device);
    }
  }

  /**
   * Get Device by Id
   */
  getById(id: string): Device|null {
    let device = null;
    for (let i = 0; i < this.devices.length; i += 1) {
      if (this.devices[i].id === id) {
        device = this.devices[i];
        break;
      }
    }

    return device;
  }

  /**
   * Remove Device from the store
   */
  removeById(id: string): void {
    for (let i = 0; i < this.devices.length; i += 1) {
      if (this.devices[i].id === id) {
        this.devices.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Get all devices
   */
  get(): Array<Device> {
    return this.devices;
  }
}

export default MemoryStore;
