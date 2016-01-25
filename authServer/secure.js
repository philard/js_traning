'use strict';

let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');

let router = express.Router();
let authorization = require('express-authorization');
// setup permission middleware
authorization.ensureRequest.options = {
    onDenied:function (req, res) {
        req.session.urlPriorLogin = req.url;//Similar to Java http://stackoverflow.com/questions/14573654/spring-security-redirect-to-previous-page-after-succesful-login#answer-23796392
        res.redirect('/login');
    }
    //redirectTo:'/login'
};

var ensureUserPageView = authorization.ensureRequest.isPermitted('user_page:view');
var ensureUserPageEdit = authorization.ensureRequest.isPermitted('user_page:edit');
var ensureSecureView = authorization.ensureRequest.isPermitted('secure:view');


router.get('/', ensureSecureView, (req, res) => {
    req.sendFile('./public/secure.html');
});


router.get('/user_page', ensureUserPageView, (req, res) => {
    res.render('user_page', { });
});

router.post('/user_page', ensureUserPageEdit, function (req, res) {
    req.session.user.permissions = [req.body.permissions];
    res.render('login', { });
});

module.exports = router;
