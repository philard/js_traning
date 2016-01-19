'use strict';

let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let security = require('./lib/security');
let randomAuth = require('./lib/random-auth');
let userPassAuth = require('./lib/user-pass-auth.js');

let server = http.createServer(app);


app.use(security(userPassAuth));
app.use(express.static(__dirname + '/public'));

server.listen(8080, () => {
    console.log('hello 8080')
});
