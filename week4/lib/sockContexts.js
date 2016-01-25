'use strict';

let textUtils= require('./lib/textUtils');
let handlers = require('./lib/handlers');


let ctx = {
    clients : [],
    questionsThree : ['what, is your name?\r\n', 'what, is your quest?\r\n', 'what, is your favorite color?\r\n']
};


exports.initializeSock = function initializeSock(sock) {

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

};


exports.dispatchResponce = function dispatchResponce(sock){

    let rawChunk = sock.read();
    if (rawChunk == null) {
        return;//usually means socket closing.
    }
    let chunk = telnetUtils.convertData((rawChunk) ? rawChunk : '');

    console.log(chunk);

    if(telnetUtils.isNewLine(chunk)) {
        let req = sock;
        let requestHandler = handlers.getRequestHandler(req, sock.session, ctx);

        var modelandview = requestHandler(req, sock.session, ctx);

        sock.session.backlog = '';

        sock.write(modelandview);
    } else if(textUtils.isNo(chunk, sock.session)) {
        sock.write(' AAAAAAAHHHHHHHHHHhhhhhhhhhhhhh...\r\n')
    } else if(textUtils.isChuckedClient(chunk, sock.session)) {
        sock.write('Go away. You\'re dead.\r\n');
        sock.write(new Buffer([7]));
    } else {
        sock.session.backlog += chunk;
    }

};




exports.removeSock = function removeSock(sock) {
    let idx = ctx.clients.indexOf(sock);
    ctx.clients.splice(idx, 1);
};

var exports = {};
return exports;