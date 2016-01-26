'use strict';

let searchableArray = require('./searchableArray');

let userStore = {
    root:{
        username: 'root',
        permission: [
            'secure:*',
            'user_page:*'
        ],
        password: '123456'
    },
    philard:{
        username: 'philard',
        permissions: searchableArray([
            'secure:*',
            'user_page:*'
        ]),
        password: '123456'
    }
};


//END User store
  module.exports = userStore;