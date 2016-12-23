'use strict';

var Yeelight = require('../lib/yeelight').Yeelight;
const yeelight = new Yeelight({verbose: true, discoveryTimeout: 100});

yeelight
  .discover(2000)
  .then((devices) => console.log(devices.length));
