/**
 * Created by Philip_John_Ardley on 18-Dec-15.
 */


'use strict';

/**
 * A very basic chat server code
 */

let net = require('net');
let clients = [];

let questionsThree = ['what, is your name?', 'what, is your quest?', 'what, is your favorite color?'];

net.createServer((sock) => {
    clients.push(sock);
    console.log('somebody just connected'
        + sock.remoteAddress +':'+ sock.remotePort);
    sock.write(questionsThree[0]);

    sock.sate = {questionsThree:0};



    sock.on('readable', () => {
        let chunk = sock.read();
        if (chunk == null) {
            return;
        }
        console.log(chunk.toString('utf-8'));

        if(chunk == '\n') newLine(backlog)

        if(sock.state.questionsThree < questionsThree.length) reciveQAnswer(sock.state.questionsThree);

        clients.forEach((it) => {
            it.write(chunk)
        });
    });

    function reciveQAnswer(questionIndex) {
        if(questionNumber == 0) {

        }
    }

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

console.log('Server listening on 7171');
