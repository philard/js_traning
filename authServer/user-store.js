'use strict';

/**
 * Each user can only contain serializable data.
 * @type {{root: {username: string, permission: string[], password: string}, philard: {username: string, permissions: string[], password: string}}}
 */
let userStore = {
    root:{
        username: 'root',
        permissions: [
            'secure:*',
            'user_page:*'
        ],
        password: '123456'
    },
    philard:{
        username: 'philard',
        permissions: [
            'secure:*',
            'user_page:*'
        ],
        password: '123456'
    }
};

  module.exports = userStore;