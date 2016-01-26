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


app.get('/', (req, res) => {
    res.render('home', { session: req.session });
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

app.get(['/login'], function (req, res) {
    res.render('login', { session: req.session });
});

app.post('/login', function (req, res) {

    let user = userStore[req.body.username];
    if(user && user.password == req.body.password) {

        req.session.user = user;//Its soo sad (but safe) that user must be serializable. ALL functions will be stripped from sessions's user.
        let urlPriorLogin = (req.session.urlPriorLogin || '/secure');
        res.redirect(urlPriorLogin );
        delete req.session.urlPriorLogin;

    } else {
        res.sendFile(__dirname+'/public/login_fail.html');
    }
});


//app.use(express.static(__dirname + '/public'));

app.use('/secure', secure);

// Start Server
let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
