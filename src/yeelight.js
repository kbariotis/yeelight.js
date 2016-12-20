import dgram from 'dgram';
import querystring from 'querystring';
import url from 'url';
import Logger from './logger';
import Device from './device';
import MemoryStore from './memoryStore';
import Store from './store';

class Yeelight {

  constructor(options) {
    this.options = Object.assign({
      verbose: true,
      discoveryTimeout: 1000,
    }, options);

    this.logger = new Logger({ enabled: this.options.verbose });
    this.store = new MemoryStore();
    this.socket = dgram.createSocket('udp4');
    this.message = new Buffer('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');
  }

  discover() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      this.socket.on('message', (msg, rinfo) => this.onMessage(msg, rinfo));

      this.socket.on('error', () => this.onError());

      this.socket.on('listening', () => this.onListening());

      this.socket.bind(43210, '0.0.0.0', () => this.onBind());
    });
  }

  onBind() {
    this.socket.send(this.message, 0, this.message.length, 1982, '239.255.255.250');

    setTimeout(() => {
      this.socket.close();
      this.resolve(this.store.get());
    }, this.options.discoveryTimeout);
  }

  onError() {
    this.reject();
  }

  onListening() {
    const address = this.socket.address();
    this.logger.info(`Listening on ${address.address}:${address.port}`);
  }

  onMessage(msg) {
    const message = querystring.parse(msg.toString('utf8'), '\r\n', ':');
    const urlObject = url.parse(message.Location);

    this.store.add(new Device({
      id: message.id,
      address: urlObject.hostname,
      port: urlObject.port,
    }));
  }
}

export { Yeelight as default, Device, Store };
