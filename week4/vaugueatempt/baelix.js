var net = require('net');

var sockets = [];

function cleanInput(data) {
    return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}

function receiveData(socket, data) {
    var cleanData = cleanInput(data);
    if(cleanData === "quit") {
        socket.end('Goodbye!\n');
    }
    else {
        for(var i = 0; i<sockets.length; i++) {
            if (sockets[i] !== socket) {
                sockets[i].write(data);
            }
        }
    }
}

function closeSocket(socket) {
    var i = sockets.indexOf(socket);
    if (i != -1) {
        sockets.splice(i, 1);
    }
}

function newSocket(socket) {
    sockets.push(socket);
    socket.write('Welcome to the Battleship Server!\n\n');
    socket.write('Please enter a username: ');
    socket.on('data', function(data) {
        receiveData(socket, data);
    })
    socket.on('end', function() {
        closeSocket(socket);
    })
}


var server = net.createServer(newSocket);
server.listen(9516);