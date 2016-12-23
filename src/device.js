/* @flow */

import net from 'net';
import querystring from 'querystring';
import url from 'url';

/**
 * Represents a Yeelight device
 */
class Device {

  id: string;
  address: string;
  port: string;
  socket: net.Socket;

  /**
   * Constructor
   */
  constructor(payload: { id: string, address: ?string, port: ?string }) {
    if (!payload.id) {
      throw new TypeError('Missing required parameters: id');
    }
    if (!payload.address) {
      throw new TypeError('Missing required parameters: address');
    }
    if (!payload.port) {
      throw new TypeError('Missing required parameters: port');
    }

    this.id = payload.id;
    this.address = payload.address;
    this.port = payload.port;
    this.socket = new net.Socket();
  }

  /**
   * Create a Device instance from a raw message
   */
  static createDeviceFromMessage(msg: Buffer): Device {
    const message = querystring.parse(msg.toString('utf8'), '\r\n', ':');

    const urlObject = url.parse(message.Location);

    return new Device({
      id: message.id,
      address: urlObject.hostname,
      port: urlObject.port,
    });
  }

  /**
   * Send command to device
   */
  sendCommand(command: Object): Promise<> {
    return new Promise((resolve, reject) => {
      const stringified = JSON.stringify(command);
      this.socket.connect(
        {
          port: this.port,
          host: this.address,
        },
        () => this.socket.write(`${stringified}\r\n`),
      );

      this.socket.on('data', (data) => {
        const response = JSON.parse(data.toString('utf8'));
        if (response.id === this.id && response.result[0] === 'ok') {
          this.socket.destroy();
          resolve();
        } else {
          reject();
        }
      });

      this.socket.on('error', err => reject(err));
      this.socket.on('close', () => resolve());
    });
  }

  /**
   * Power on/off the device
   */
  powerOn(power: string, effect: string, duration: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_power', params: [power, effect, duration] });
  }

  getProp(props: Array<string>): Promise<> {
    return this.sendCommand({ id: this.id, method: 'get_prop', params: props });
  }

  setCtAbx(ctValue: number, effect: string, duration: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_ct_abx', params: [ctValue, effect, duration] });
  }

  setRgb(rgbValue: number, effect: string, duration: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_rgb', params: [rgbValue, effect, duration] });
  }

  setHsv(hue: number, sat: number, effect: string, duration: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_hsv', params: [hue, sat, effect, duration] });
  }

  setBright(brightness: number, effect: string, duration: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_bright', params: [brightness, effect, duration] });
  }

  toggle(): Promise<> {
    return this.sendCommand({ id: this.id, method: 'toggle', params: [] });
  }

  default(): Promise<> {
    return this.sendCommand({ id: this.id, method: 'default', params: [] });
  }

  startCf(count: number, action: number, flowExpression: string): Promise<> {
    return this.sendCommand({ id: this.id, method: 'start_cf', params: [count, action, flowExpression] });
  }

  stopCf(): Promise<> {
    return this.sendCommand({ id: this.id, method: 'stop_cf', params: [] });
  }

  setScene(name: string, val1: number, val2: number, val3: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_scene', params: [name, val1, val2, val3] });
  }

  cronAdd(type: number, value: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'cron_add', params: [type, value] });
  }

  cronGet(type: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'cron_get', params: [type] });
  }

  cronDel(type: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'cron_del', params: [type] });
  }

  setAdjust(action: string, prop: string): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_adjust', params: [action, prop] });
  }

  setMusic(action: number, host: string, port: number): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_music', params: [action, host, port] });
  }

  setName(name: string): Promise<> {
    return this.sendCommand({ id: this.id, method: 'set_name', params: [name] });
  }
}

export default Device;
