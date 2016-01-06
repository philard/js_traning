'use strict';

module.exports = function(login, pass) {


    return ((req, res, next) => {
        if (isAuthorised(req, res)) {
            next();
        } else {
            res.set('WWW-Authenticate', 'Basic realm="You shall not pass!!!"');
            res.status(401).send('Not allowd');
        }
    });

    function isAuthorised (req, res) {
        let header = req.headers.authorization;
        if(!header) {
            return false;
        }

        let hash = header.split(' ')[1];
        let text = new Buffer(hash, 'base64').toString('utf-8');

        let loginpass = login + ':' + pass;
        console.log('text:'+text+' loginpass: '+ loginpass);

        let out = (text == loginpass);
        return out;
    };

};





