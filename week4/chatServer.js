/**
 * Created by Philip_John_Ardley on 18-Dec-15.
 */


'use strict';

/**
 * A very basic chat server code
 */

let net = require('net');

const dutil = require('./data');




let clients = [];

let questionsThree = ['what, is your name?\n', 'what, is your quest?', 'what, is your favorite color?'];

net.createServer((sock) => {
    clients.push(sock);
    console.log('Connected. Address:' + sock.remoteAddress +' Port:'+ sock.remotePort);

    sock.sate = {
        questionIndex:0,
        backlog: '',
    };

    sock.write(questionsThree[0]);

    sock.on('readable', () => {
        let rawChunk = sock.read();
        if (chunk == null) { return; }
        var chunk = dutil.convertData((rawChunk)?rawChunk:'');


        console.log(chunk);

        if(rawChunk == '\n') {
            handleNewLine(sock.state.backlog, sock);
            sock.state.backlog = '';
        } else {
            sock.backlog += chunk;
        }


        clients.emit('',chunk,sock);
    });

    clients.emit = function emit(channel, data, currentSock) {

        for(let i=0; i<clients.length; i++) {
            if(clients[i] !== currentSock) clients[i].write(chunk)
        }

    };

    sock.on('end', () => {
        console.log('Disconnected');
        removeSock(sock);
    });

    sock.on('error', () => {
        console.log('Disconnected forcefully');
        removeSock(sock);
    });

    function removeSock(sock) {
        let idx = clients.indexOf(sock);
        clients.splice(idx, 1);
    }
}).listen(7171);

function handleNewLine(backlog, sock) {

    if(sock.state.questionsThree < questionsThree.length) {
        receiveQAnswer(backlog, sock.state.questionIndex);
    }

}

function receiveQAnswer(backlog, sock) {
    if(sock.state.questionIndex == 0) {
        if (!sock.state.userdata) sock.state.userdata = {};
        sock.state.userdata.name = backlog;


        sock.write(questionsThree[1]);
        return;

    } else if(questionIndex == 1) {
        if(!sock.state.userdata) {sock.state.userdata = {}}
        sock.state.userdata.quest = backlog;

        sock.write(questionsThree[2]);
        return;
    }
}

console.log('Server listening on 7171');
