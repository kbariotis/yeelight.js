import Store from './store';

class MemoryStore extends Store {
  constructor() {
    super();
    this.devices = [];
  }

  add(device) {
    if (!this.getById(device.id)) {
      this.devices.push(device);
    }
  }

  getById(id) {
    let device = null;
    for (let i = 0; i < this.devices.length; i += 1) {
      if (this.devices[i].id === id) {
        device = this.devices[i];
        break;
      }
    }

    return device;
  }

  removeById(id) {
    for (let i = 0; i < this.devices.length; i += 1) {
      if (this.devices[i].id === id) {
        this.devices.splice(i, 1);
        break;
      }
    }
  }

  get() {
    return this.devices;
  }
}

export default MemoryStore;
