'use strict';

const Yeelight = require('../lib/yeelight').Yeelight;
const yeelight = new Yeelight({verbose: true});

yeelight.watch();
yeelight.on('device', (device) => {

  device
    .toggle()
    .then(() => yeelight.stop())
    .catch((err) => console.log(err));
});
