import dgram from 'dgram';
import EventEmitter from 'events';

class Watch extends EventEmitter {

  constructor() {
    super();
    this.socket = dgram.createSocket('udp4');
  }

  watch() {
    this.socket.on('error', () => this.emit('error'));

    this.socket.on('listening', () => this.emit('listening'));

    this.socket.on('message', msg => this.emit('message', msg));

    this.socket.bind(1982, () => this.socket.addMembership('239.255.255.250'));
  }

  stop() {
    this.socket.close();
  }

}

export default Watch;
