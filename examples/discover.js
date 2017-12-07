const Yeelight = require('../lib/yeelight').Yeelight;
const yeelight = new Yeelight({verbose: true});

yeelight
  .discover(10000)
  .then((devices) => console.log(devices.length));
