'use strict';

//User Store
let userStore = {root:{
        username: 'root',
        permission: '*:*',
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
//END User store
  module.exports = userStore;