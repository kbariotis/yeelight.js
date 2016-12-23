/* @flow */

import EventEmitter from 'events';
import Logger from './logger';
import Device from './device';
import MemoryStore from './memoryStore';
import Store from './store';
import Discover from './discover';
import Watcher from './watch';

/**
 * Device manager for your Yeelight devices
 */
class Yeelight extends EventEmitter {

  options: Object;
  logger: Logger;
  store: MemoryStore;
  discovery: Discover;
  watcher: Watcher;

  /**
   * Constructor
   */
  constructor(options: { verbose: boolean }) {
    super();
    this.options = Object.assign({
      verbose: true,
    }, options);

    this.logger = new Logger({ enabled: this.options.verbose });
    this.store = new MemoryStore();
    this.discovery = new Discover();
    this.watcher = new Watcher();
  }

  /**
   * Start the discovery of connected Yeelight devices. Return
   * devices found after `discoveryTimeout`.
   */
  discover(discoveryTimeout: number): Promise<Array<Device>> {
    return new Promise((resolve, reject) => {
      this.discovery.discover();

      this.discovery.on('message', msg => this.onReply(msg));
      this.discovery.on('error', () => reject());

      setTimeout(() => {
        resolve(this.store.get());
      }, discoveryTimeout);
    });
  }

  onReply(msg: Buffer) {
    this.store.add(Device.createDeviceFromMessage(msg));
  }

  /**
   * Start watching for advertisment packets of Yeelight devices.
   * Emits devices on `device` event.
   */
  watch(): void {
    this.watcher.on('message', msg => this.onAdvertisment(msg));
    this.watcher.watch();
  }

  /**
   * Stop watching
   */
  stop(): void {
    this.watcher.stop();
  }

  onAdvertisment(msg: Buffer) {
    const device = Device.createDeviceFromMessage(msg);
    this.store.add(device);
    this.emit('device', device);
  }
}

export { Yeelight, Device, Store };
