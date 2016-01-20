'use strict';

let express = require('express');
let http = require('http');
let authorization = require('express-authorization');


let app = express();





app.use(express.static(__dirname + '/public'));



let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
