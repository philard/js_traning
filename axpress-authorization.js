'use strict';

let express = require('express');
let http = require('http');
let authorization = require('express-authorization');


let app = express();


let security = require('./lib/security');
let userPassAuth = require('./lib/user-pass-auth.js');
app.use(security(userPassAuth));



app.use(express.static(__dirname + '/public'));



let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
