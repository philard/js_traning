
var net = require('net');

var client = net.connect(
    {port: 7171,
    	host: '10.22.16.64'},
    function() { 
        console.log('Connected to server');
        process.stdin.pipe(client);
        client.pipe(process.stdout);
    }
);

client.on('error', function(err) {
    console.log("Error: " + err);
});
