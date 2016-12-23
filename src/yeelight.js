import EventEmitter from 'events';
import Logger from './logger';
import Device from './device';
import MemoryStore from './memoryStore';
import Store from './store';
import Discover from './discover';
import Watcher from './watch';

class Yeelight extends EventEmitter {

  constructor(options) {
    super();
    this.options = Object.assign({
      verbose: true,
      discoveryTimeout: 1000,
    }, options);

    this.logger = new Logger({ enabled: this.options.verbose });
    this.store = new MemoryStore();
    this.discovery = new Discover({ discoveryTimeout: this.options.discoveryTimeout });
    this.watcher = new Watcher();
  }

  discover() {
    return new Promise((resolve, reject) => {
      this.discovery.discover();

      this.discovery.on('message', msg => this.onReply(msg));
      this.discovery.on('error', () => reject());

      setTimeout(() => {
        resolve(this.store.get());
      }, this.options.discoveryTimeout);
    });
  }

  onReply(msg) {
    this.store.add(Device.createDeviceFromMessage(msg));
  }

  watch() {
    this.watcher.on('message', msg => this.onAdvertisment(msg));
    this.watcher.watch();
  }

  stop() {
    this.watcher.stop();
  }

  onAdvertisment(msg) {
    const device = Device.createDeviceFromMessage(msg);
    this.store.add(device);
    this.emit('device', device);
  }
}

export { Yeelight as default, Device, Store };
