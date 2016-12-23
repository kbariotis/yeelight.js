/* @flow*/

import dgram from 'dgram';
import EventEmitter from 'events';

/**
 * Class for watching for advertisments packets from
 * Yeelight devices.
 */
class Watch extends EventEmitter {

  socket: Object;
  message: Buffer;

  /**
   * Constructor
   */
  constructor() {
    super();
    this.socket = dgram.createSocket('udp4');
  }

  /**
   * Start listening for advertisments packets from Yeelight
   * devices. Emits `message` event on response.
   */
  watch(): void {
    this.socket.on('error', () => this.emit('error'));

    this.socket.on('listening', () => this.emit('listening'));

    this.socket.on('message', msg => this.emit('message', msg));

    this.socket.bind(1982, () => this.socket.addMembership('239.255.255.250'));
  }

  /**
   * Stop watching
   */
  stop() {
    this.socket.close();
  }

}

export default Watch;
