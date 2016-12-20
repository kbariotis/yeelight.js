const dgram = require('dgram');
var message = new Buffer(
    "M-SEARCH * HTTP/1.1\r\n" +
    "HOST:239.255.255.250:1982\r\n" +
    "MAN:\"ssdp:discover\"\r\n" +
    "ST:wifi_bulb\r\n"
);
const socket = dgram.createSocket('udp4');
const net = require('net');

socket.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    var client = new net.Socket();
    client.connect(55443, rinfo.address, function() {
        console.log('Connected');
        client.write(JSON.stringify({ "id": 1, "method": "set_power", "params":["on", "smooth", 500]}) + "\r\n");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
});

socket.on('listening', () => {
  var address = socket.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(43210, '0.0.0.0', function () {

    socket.send(message, 0, message.length, 1982, '239.255.255.250', function () {
        console.log("Sent '" + message + "'");
    });
});
