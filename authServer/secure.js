'use strict';

let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let userStore = require('./user-store');
let User = require('./User');

let router = express.Router();
let authorization = require('express-authorization');

//We won't use the default, we'll only use customized ensureRequest(s).
let ensureViewRequest = new authorization.EnsureRequest();
ensureViewRequest.options = {
    onDenied:function (req, res) {
        req.session.urlPriorLogin = req.originalUrl;
        res.redirect('/login');
    }
};
let ensureSecureView = ensureViewRequest.isPermitted('secure:view');
let ensureUserPageView = ensureViewRequest.isPermitted('user_page:view');

let ensurePostRequest = new authorization.EnsureRequest();
ensurePostRequest.options = {
    onDenied: function(req, res) {
        let user = new User(req.session.user);
        res.render('user_page', {                  //TODO:should really find the originalUrl to render
            user: user,
            message: 'Sorry, you don\'t have the edit permission for this resource.'
        });
    }
};

let ensureUserPageEdit = ensurePostRequest.isPermitted('user_page:edit');


router.get('/', ensureSecureView, (req, res) => {
    res.sendFile(__dirname+'/public/secure.html');
});


router.get('/user_page', ensureUserPageView, (req, res) => {
    let user = new User(req.session.user);
    res.render('user_page', { user: user} );
});

router.post('/user_page', ensureUserPageEdit, function (req, res) {
    let noun = req.body.noun;
    let verbs = req.body.verbs;

    let updatedUser = new User(req.session.user);
    updatedUser.setPermission(noun, verbs);

    req.session.user = updatedUser;

    res.redirect('/secure/user_page');
});

module.exports = router;
