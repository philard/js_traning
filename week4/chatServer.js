/**
 * Created by Philip_John_Ardley on 18-Dec-15.
 */


'use strict';

/**
 * A very basic chat server code
 */

let net = require('net');

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

    sock.write(questionsThree[0]);

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
            let requestHandler = getRequestHandler(req, sock.session, ctx);

            var modelandview = requestHandler(req, sock.session, ctx);
            sock.session.backlog = '';
        } else {
            sock.session.backlog += chunk;
        }


        ctx.clients.emit('',chunk,sock);
    });//END readable

    ctx.clients.emit = function emit(channel, data, currentSock) {

        for(let i=0; i<ctx.clients.length; i++) {
            if(ctx.clients[i] !== currentSock) ctx.clients[i].write(chunk)
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
        let idx = ctx.clients.indexOf(sock);
        ctx.clients.splice(idx, 1);
    }
}).listen(7171);

function isNewLine(data) {
    return (data == '\r\n');
}

/*
Get request handler for (newline) request. A bit like SpringMVC's request mapping xml file.
 */
function getRequestHandler(req, session, ctx) {
    let requestHandler;
    if(session.questionIndex == 0) {
        return handleQuestionOne;
    } else if(session.questionIndex == 1) {
        return handleQuestionTwo;
    } else if(session.questionIndex == 2) {
        return handleQuestionThree;
    }

}


function handleQuestionOne(req, session, ctx) {
    session.name = backlog;
    return questionsThree[1];
}

function handleQuestionTwo(req, session, ctx) {
    session.quest = backlog;
    return questionsThree[2];
}

function handleQuestionThree(req, session, ctx) {
    session.favoriteColor = backlog;
    return 'you may pass';
}


function handleChatMessageRequest(req, session, ctx) {
    return 'todo...';
}

console.log('Server listening on 7171');
