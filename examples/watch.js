'use strict';

var Yeelight = require('../lib/yeelight').Yeelight;
const yeelight = new Yeelight({verbose: true, discoveryTimeout: 100});

yeelight.watch();
yeelight.on('device', (device) => {

  device.toggle();
  yeelight.stop();
});
