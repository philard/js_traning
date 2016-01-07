'use strict';

/**
 * A chat server with some inital questions for the user.
 */

let net = require('net');

let handlers = require('./lib/handlers');

const dutil = require('./data');




let ctx = {
    clients : [],
    questionsThree : ['what, is your name?', 'what, is your quest?', 'what, is your favorite color?']
};

net.createServer((sock) => {
    ctx.clients.push(sock);
    console.log('Connected. Address:' + sock.remoteAddress +' Port:'+ sock.remotePort);

    sock.session = {
        questionIndex:0,
        backlog: '',
        name:'',
        quest:'',
        favoriteColor:''
    };

    sock.write(ctx.questionsThree[0]);

    //START readable
    sock.on('readable', () => {
        let rawChunk = sock.read();
        if (rawChunk == null) {
            return;//usually means socket closing.
        }
        var chunk = dutil.convertData((rawChunk) ? rawChunk : '');

        console.log(chunk);

        if(isNewLine(chunk)) {
            let req = sock;
            let requestHandler = handlers.getRequestHandler(req, sock.session, ctx);

            var modelandview = requestHandler(req, sock.session, ctx);

            sock.session.backlog = '';

            sock.write(modelandview);
        } else {
            sock.session.backlog += chunk;
        }

    });
    //END readable


    sock.on('end', () => {
        console.log('Disconnected');
        removeSock(sock);
    });
    sock.on('error', () => {
        console.log('Disconnected forcefully');
        removeSock(sock);
    });
    function removeSock(sock) {
        let idx = ctx.clients.indexOf(sock);
        ctx.clients.splice(idx, 1);
    }
}).listen(7171);

function isNewLine(data) {
    return (data == '\r\n');
}


ctx.clients.emit = function emit(channel, data, currentSock) {

    for(let i=0; i<ctx.clients.length; i++) {
        if(ctx.clients[i] !== currentSock) ctx.clients[i].write(chunk)
    }

};

console.log('Server listening on 7171');
