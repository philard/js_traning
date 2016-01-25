'use strict';

/**
 * A chat server with some inital questions for the user.
 */

let net = require('net');

let sockContexts = require('./lib/sockContexts');





net.createServer((sock) => {

    sockContexts.initializeSock(sock);


    sock.on('readable', () => {
        sockContexts.dispatchResponce(sock);
    });

    sock.on('end', () => {
        console.log('Disconnected');
        sockContexts.removeSock(sock);
    });

    sock.on('error', () => {
        console.log('Disconnected forcefully');
        sockContexts.removeSock(sock);
    });

}).listen(7171);



console.log('Server listening on 7171');
