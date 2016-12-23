/* @flow */

import dgram from 'dgram';
import EventEmitter from 'events';

/**
 * Discover Yeelight devices on demand
 */
class Discover extends EventEmitter {

  socket: Object;
  message: Buffer;

  /**
   * Constructor
   */
  constructor() {
    super();
    this.socket = dgram.createSocket('udp4');
    this.message = new Buffer('M-SEARCH * HTTP/1.1\r\nHOST:239.255.255.250:1982\r\nMAN:"ssdp:discover"\r\nST:wifi_bulb\r\n');
  }

  /**
   * Start discovery of Yeelight Devices. It will send a multicast message
   * and wait for response. Emits `message` event on response.
   */
  discover(): void {
    this.socket.on('message', (msg, rinfo) => this.emit('message', msg, rinfo));

    this.socket.on('error', () => this.emit('error'));

    this.socket.on('listening', () => this.emit('listening'));

    this.socket.bind(43210, '0.0.0.0', () => this.onBind());
  }

  onBind() {
    this.socket.send(this.message, 0, this.message.length, 1982, '239.255.255.250');
  }

  /**
   * Stop discovery
   */
  stop() {
    this.socket.close();
  }

}

export default Discover;
