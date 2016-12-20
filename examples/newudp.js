var dgram = require('dgram'); // dgram is UDP

// Listen for responses
function listen(port) {
    var server = dgram.createSocket("udp4");

    server.on("message", function (msg, rinfo) {
        console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    });

    server.bind(port, function () {

        // Give it a while for responses to come in
        setTimeout(function(){
            console.log("Finished waiting");
            // server.close();
        },2000);
    }); // Bind to the random port we were given when sending the message, not 1900
}

function search() {

    var message = new Buffer(
        "M-SEARCH * HTTP/1.1\r\n" +
        "HOST:239.255.255.250:1982\r\n" +
        "MAN:\"ssdp:discover\"\r\n" +
        "ST:wifi_bulb\r\n"
    );

    var client = dgram.createSocket("udp4");
    client.bind(function () {

        listen(client.address().port);
        client.send(message, 0, message.length, 1982, "239.255.255.250", function (err) {
            console.log(err);
            // client.close();
        });
    }); // So that we get a port so we can listen before sending
}

search();
