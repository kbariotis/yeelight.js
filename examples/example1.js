var Yeelight = require('../lib/yeelight');
var Device = require('../lib/device');

Yeelight.discover().then((devices) => console.log(devices));
