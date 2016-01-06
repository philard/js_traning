'use strict';

let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



const user = 'admin';
const pass = 'pass';

app.use((req, res, next) => {
    if (isAuthorised(req, res)) {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="You shall not pass!!!"');
        res.status(401).send('Not allowd');
    }
});


function isAuthorised(req, res) {
    let header = req.headers.authorization;
    if(!header) header = 'none none ';

    let hash = header.split(' ')[1];
    let test = new Buffer(hash, 'base64').toString('utf-8');

    return test == user + ':' + pass;
}





app.use(express.static(__dirname + '/public'));




server.listen(8080, () => {
    console.log('hello 8080')
});
