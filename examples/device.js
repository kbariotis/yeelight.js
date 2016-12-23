'use strict';

var Device = require('../lib/yeelight').Device;

const device = new Device({
  id: '1234',
  address: '192.168.0.19',
  port: '55443',
});

device
  .toggle()
  .then(() => console.log('done'))
  .catch((err) => console.log(err));
