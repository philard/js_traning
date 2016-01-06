'use strict';

let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let auth = require('./lib/basic-auth');

let server = http.createServer(app);


app.use(auth('admin', 'pass'));
app.use(express.static(__dirname + '/public'));

server.listen(8080, () => {
    console.log('hello 8080')
});
