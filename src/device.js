import net from 'net';

class Device {

  constructor(payload) {
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

  sendCommand(command) {
    return new Promise((resolve, reject) => {
      const stringified = JSON.stringify(command);
      this.socket.connect(this.port, this.address, () => this.socket.write(`${stringified}\r\n`)); // Should those be double quotes??

      this.socket.on('data', (data) => {
        const response = JSON.parse(data.toString('utf8'));
        // {"id":1, "result":["ok"]} response from the device
        if (response.id === this.id && response.result[0] === 'ok') {
          this.socket.destroy();
          resolve();
        } else {
          reject();
        }
      });

      this.socket.on('error', () => reject());
      this.socket.on('close', () => resolve());
    });
  }

  // 'on', 'smooth', 500
  powerOn(power, effect, duration) {
    return this.sendCommand({ id: this.id, method: 'set_power', params: [power, effect, duration] });
  }

  getProp(props) {
    return this.sendCommand({ id: this.id, method: 'get_prop', params: props });
  }

  setCtAbx(ctValue, effect, duration) {
    return this.sendCommand({ id: this.id, method: 'set_ct_abx', params: [ctValue, effect, duration] });
  }

  setRgb(rgbValue, effect, duration) {
    return this.sendCommand({ id: this.id, method: 'set_rgb', params: [rgbValue, effect, duration] });
  }

  setHsv(hue, sat, effect, duration) {
    return this.sendCommand({ id: this.id, method: 'set_hsv', params: [hue, sat, effect, duration] });
  }

  setBright(brightness, effect, duration) {
    return this.sendCommand({ id: this.id, method: 'set_bright', params: [brightness, effect, duration] });
  }

  toggle() {
    return this.sendCommand({ id: this.id, method: 'toggle', params: [] });
  }

  default() {
    return this.sendCommand({ id: this.id, method: 'default', params: [] });
  }

  startCf(count, action, flowExpression) {
    return this.sendCommand({ id: this.id, method: 'start_cf', params: [count, action, flowExpression] });
  }

  stopCf() {
    return this.sendCommand({ id: this.id, method: 'stop_cf', params: [] });
  }

  setScene(name, val1, val2, val3) {
    return this.sendCommand({ id: this.id, method: 'set_scene', params: [name, val1, val2, val3] });
  }

  cronAdd(type, value) {
    return this.sendCommand({ id: this.id, method: 'cron_add', params: [type, value] });
  }

  cronGet(type) {
    return this.sendCommand({ id: this.id, method: 'cron_get', params: [type] });
  }

  cronDel(type) {
    return this.sendCommand({ id: this.id, method: 'cron_del', params: [type] });
  }

  setAdjust(action, prop) {
    return this.sendCommand({ id: this.id, method: 'set_adjust', params: [action, prop] });
  }

  setMusic(action, host, port) {
    return this.sendCommand({ id: this.id, method: 'set_music', params: [action, host, port] });
  }

  setName(name) {
    return this.sendCommand({ id: this.id, method: 'set_name', params: [name] });
  }
}

export default Device;
