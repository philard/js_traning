'use strict';

let express = require('express');
let http = require('http');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
let secure = require('./secure');
let userStore = require('./user-store');
let app = express();

// all environments
app.set('view engine', 'ejs');
//app.use(express.logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('your secret here'));
app.use(session());



app.get('/login', function (req, res) {
    res.render('login', { });
});

app.post('/login', function (req, res) {

    let user = userStore[req.body.username];
    if(user && user.password == req.body.password) {

        req.session.user = user;
        res.redirect(req.session.urlPriorLogin);
        delete req.session.urlPriorLogin;

    } else {
        res.redirect('/login');
    }
});


app.use(express.static(__dirname + '/public'));

app.use('/secure', secure);

// Start Server
let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
