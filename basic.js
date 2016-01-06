'use strict';

let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let security = require('./lib/basic-auth');
let authorizer = require('./lib/random-auth');

let server = http.createServer(app);


app.use(security(authorizer));
app.use(express.static(__dirname + '/public'));

server.listen(8080, () => {
    console.log('hello 8080')
});
