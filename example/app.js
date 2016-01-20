'use strict';

var express = require('express');
var http = require('http');
var authorization = require('express-authorization');

var app = express();

// all environments
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
//?app.use(express.json());
//?app.use(express.urlencoded());
//?app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setup permission middleware
authorization.ensureRequest.options = {
  onDenied:function (req, res) {
  //See http://stackoverflow.com/questions/14573654/spring-security-redirect-to-previous-page-after-succesful-login#answer-23796392
    req.session.urlPriorLogin = req.url;
    res.redirect('/login');
  },
  //redirectTo:'/login'
};

var ensureAssetView = authorization.ensureRequest.isPermitted('asset:view');

// Define Routes
app.get('/', function (req, res) {
  res.render('home', { authenticated: req.session.user ? true : false });
});

app.get('/login', function (req, res) {
  res.render('login', { });
});

app.post('/login', function (req, res) {
  req.session.user = {
    username: "root",
    permissions: [ 'asset:view,edit' ]
  };
  res.redirect(req.session.urlPriorLogin);
  delete req.session.urlPriorLogin;
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('/asset', ensureAssetView, function (req, res) {
  res.render('asset', { });
});

app.use(ensureAssetView);

app.use(express.static(__dirname + '/public'));

// Start Server
http.createServer(app).listen(3000, function() {
  console.log('Express server listening on port ' + 3000);
});
