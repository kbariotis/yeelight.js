const Device = require('../lib/yeelight').Device;

const device = new Device({
  id: 'Y1',
  address: '192.168.0.18',
  port: '55443',
});

device
  .toggle()
  .then(() => console.log('done'))
  .catch((err) => console.log(err));
