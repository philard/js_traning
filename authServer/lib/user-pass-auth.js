"use strict";


module.exports = (login, pass) => {
    let correctLogin = 'admin';
    let correctPass = 'pass';

    return (login == correctLogin) && (correctPass == pass);

};
