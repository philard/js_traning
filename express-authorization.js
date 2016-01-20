'use strict';

let express = require('express');
let http = require('http');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let authorization = require('express-authorization');

let app = express();

// all environments
app.set('view engine', 'ejs');
//app.use(express.logger('dev'));
app.use(cookieParser('your secret here'));
app.use(session());

// setup permission middleware
authorization.ensureRequest.options = {
    onDenied:function (req, res) {
        //See http://stackoverflow.com/questions/14573654/spring-security-redirect-to-previous-page-after-succesful-login#answer-23796392
        req.session.urlPriorLogin = req.url;
        res.redirect('/login');
    },
    //redirectTo:'/login'
};
var ensureAssertView = authorization.ensureRequest.isPermitted('assert:view');


app.get('/login', function (req, res) {
    res.render('login', { });
});


app.post('/login', function (req, res) {
    req.session.user = {
        username: "root",
        permissions: [ 'assert:view,edit' ]
    };
    res.redirect(req.session.urlPriorLogin);
    delete req.session.urlPriorLogin;
});

app.use(ensureAssertView);

app.use(express.static(__dirname + '/public'));

// Start Server
let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
