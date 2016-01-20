'use strict';

let express = require('express');
let http = require('http');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
let authorization = require('express-authorization');

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

// setup permission middleware
authorization.ensureRequest.options = {
    onDenied:function (req, res) {
        req.session.urlPriorLogin = req.url;//Similar to Java http://stackoverflow.com/questions/14573654/spring-security-redirect-to-previous-page-after-succesful-login#answer-23796392
        res.redirect('/login');
    }
    //redirectTo:'/login'
};

var ensureAssetView = authorization.ensureRequest.isPermitted('asset:view');
var ensureAssetEdit = authorization.ensureRequest.isPermitted('asset:edit');
var ensureSecureView = authorization.ensureSecureView.isPermitted('secure:view');

app.get('/login', function (req, res) {
    res.render('login', { });
});


app.post('/login', function (req, res) {
    req.session.user = {
        username: req.body.username,
        permissions: [ 'asset:view,edit', 'secure:' ]
    };
    res.redirect(req.session.urlPriorLogin);
    delete req.session.urlPriorLogin;
});


app.use(express.static(__dirname + '/public'));

app.use('/secure', ensureSecureView, (req, res) => {
    req.sendFile('./public/secure.html');
});

app.use(ensureAssetView);
app.get('/asset', (req, res) => {
    res.render('asset', { });
});

app.post('/asset', ensureAssetEdit, function (req, res) {
    req.session.user.permissions = [req.body.permissions];
    res.render('login', { });
});



// Start Server
let server = http.createServer(app);
server.listen(8080, () => {
    console.log('hello 8080')
});
