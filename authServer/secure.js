'use strict';

let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let userStore = require('./user-store');

let router = express.Router();
let authorization = require('express-authorization');
// setup permission middleware
authorization.ensureRequest.options = {
    onDenied:function (req, res) {
        req.session.urlPriorLogin = req.originalUrl;
        res.redirect('/login');
    }
    //redirectTo:'/login'
};

var ensureSecureView = authorization.ensureRequest.isPermitted('secure:view');
var ensureUserPageView = authorization.ensureRequest.isPermitted('user_page:view');
var ensureUserPageEdit = authorization.ensureRequest.isPermitted('user_page:edit');


router.get('/', ensureSecureView, (req, res) => {
    res.sendFile(__dirname+'/public/secure.html');
});


router.get('/user_page', ensureUserPageView, (req, res) => {
//router.get('/user_page', (req, res) => {
    res.render('user_page', { user: req.session.user});
});

//router.post('/user_page', ensureUserPageEdit, function (req, res) {
router.post('/user_page', function (req, res) {
    req.session.user.permissions = [req.body.permissions];
    res.render('user_page', { });
});

module.exports = router;
