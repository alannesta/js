var os = require('os');
var ifaces = os.networkInterfaces();

var config = {
    localhost: '127.0.0.1',
    websocketPort: 31203
};

// get the server's local ip address

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            config.localhost = iface.address;
        }
    });
});

module.exports = config;
