'use strict';

/**
 * A chat server with some inital questions for the user.
 */

let net = require('net');

let handlers = require('./lib/handlers');

const dutil = require('./data');

let telnetUtils = require('./lib/telnetUtils');


let ctx = {
    clients : [],
    questionsThree : ['what, is your name?\r\n', 'what, is your quest?\r\n', 'what, is your favorite color?\r\n'],
    telnetUtils : telnetUtils
};

net.createServer((sock) => {
    ctx.clients.push(sock);
    console.log('Connected. Address:' + sock.remoteAddress +' Port:'+ sock.remotePort);

    sock.session = {
        questionIndex : 0,
        backlog : '',
        name : '',
        quest : '',
        favoriteColor : '',
        chucked : false
    };

    sock.write(ctx.questionsThree[0]);

    ctx.telnetUtils.emitLineInsertion(sock, ctx, 'a new client connected');


    //START readable
    sock.on('readable', () => {
        let rawChunk = sock.read();
        if (rawChunk == null) {
            return;//usually means socket closing.
        }
        let chunk = dutil.convertData((rawChunk) ? rawChunk : '');

        console.log(chunk);

        if(isNewLine(chunk)) {
            let req = sock;
            let requestHandler = handlers.getRequestHandler(req, sock.session, ctx);

            var modelandview = requestHandler(req, sock.session, ctx);

            sock.session.backlog = '';

            sock.write(modelandview);
        } else if(isNo(chunk, sock.session)) {
            sock.write(' AAAAAAAHHHHHHHHHHhhhhhhhhhhhhh...\r\n')
        } else if(isChuckedClient(chunk, sock.session)) {
            sock.write('Go away. You\'re dead.\r\n');
            sock.write(new Buffer([7]));
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

function isNo(data, session) {
    let lastThreeChars = (session.backlog.slice(-2)+ data).toLowerCase();
    return lastThreeChars === ' no' || lastThreeChars === ',no';
}

function isChuckedClient(data, session) {
    return session.isChucked;
}

console.log('Server listening on 7171');
