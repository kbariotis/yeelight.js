# Yeelight.js [![Build Status](https://travis-ci.org/kbariotis/yeelight.js.svg?branch=master)](https://travis-ci.org/kbariotis/yeelight.js)
Control all of your Yeelight Devices with Node.js

[Yeelight products](https://www.yeelight.com/)

Big thanks to [Travelport-Ukraine/npm-module-boilerplate](https://github.com/Travelport-Ukraine/npm-module-boilerplate) 
for their great boilerplate.

You can find the API documentation of the Yeelight devices 
[here](http://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf).

## Docs

Yeelight.js consists of several classes you can utilize separetaly. Let's
check them out.

### Yeelight
Yeelight class is a device manager that you can start playing around
imidiatelly. It provices discovery of Yeelight devices and watching for 
new devices. By default it stores the devices in memory, but you can
write your own driver to store them wherever you want.

This is an example to start discovering devices in your local network.
```js
const Yeelight = require('yeelight.js').Yeelight;

const yeelight = new Yeelight();
Yeelight
  .discover()
  .then((devices) => console.log(devices.length));
```

`discover` command will stop after the timeout specified in Yeelight's 
constructor.

Or to start watching for new devices.
```js
const Yeelight = require('yeelight.js').Yeelight;

const yeelight = new Yeelight();

yeelight.watch();
yeelight.on('device', (device) => {
  
  device.toggle();

  // Stop watching  
  yeelight.stop();
})
```

### Device
When you already know the device's IP address and port.

This is an example to start sending commands to your device.
```js
const Device = require('yeelight.js').Device;

const device = new Device({
  id: '1234',
  address: '192.168.0.11',
  port: 1982,
});

device.toggle();
```

Read the generated documentation [here](https://github.com/kbariotis/yeelight.js/blob/master/DOCS.md).

## Contributing

[Read this first](https://github.com/kbariotis/yeelight.js/blob/master/CONTRIBUTING.md)

This module uses Babel to transpile Stage 2 Javascript and airbnb's style.

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm run cover` - Yes. You can even cover ES6 code.
- `npm run lint` - Lint your code.
- `npm run flow` - Check using Flow.
- `npm run test:examples` - Write your examples on pure JS for better understanding module usage.
- `npm run build` - Build.
- `npm run build-docs` - Build documentation using Documentation.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing you module.

## License
[MIT Licence](https://github.com/kbariotis/yeelight.js/blob/master/LICENCE)
