# Yeelight.js [![Build Status](https://travis-ci.org/kbariotis/yeelight.js.svg?branch=master)](https://travis-ci.org/kbariotis/yeelight.js)
Control all of your Yeelight Devices with Node.js

[Yeelight products](https://www.yeelight.com/)

Big thanks to [Travelport-Ukraine/npm-module-boilerplate](https://github.com/Travelport-Ukraine/npm-module-boilerplate) 
for their great boilerplate.

You can find the API documentation of the Yeelight devices [here](http://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf).

## Docs

### Yeelight: A device manager and discovery tool.

This is an example to start discovering devices in your local network.
```js
import Yeelight from require('yeelight.js');

Yeelight.discover().then((devices) => console.log(devices));
```

### Device: When you already know the device's IP address and port.

This is an example to start sending commands to your device.
```js
import Device from require('yeelight.js');

const device = new Device({
  id: '1234',
  address: '192.168.0.11',
  port: 1982,
});

device.toggle();
```

@TODO: Enhance documentation

## Contributing

This module uses Babel to transpile Stage 2 Javascript and airbnb's style.

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm run cover` - Yes. You can even cover ES6 code.
- `npm run lint` - Lint your code.
- `npm run test:examples` - Write your examples on pure JS for better understanding module usage.
- `npm run build` - Build.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing you module.

## License
[MIT Licence]
