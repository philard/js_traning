'use strict';

let userStore = {
    root:new User({
        username: 'root',
        permission: [
            'secure:*',
            'user_page:*'
        ],
        password: '123456'
    }),
    philard:new User({
        username: 'philard',
        permissions: [
            'secure:*',
            'user_page:*'
        ],
        password: '123456',
    })
};

function User(properties) {
    Object.assign(this, properties);
}

User.prototype.getPermission = getPermission;
User.prototype.setPermission = setPermission;

for(let userKey in userStore) {
    userStore[userKey].getPermission = getPermission;
    userStore[userKey].setPermission = setPermission;
}

function getPermission(noun, user) {
    user = user || this;
    let pms = user.permissions;
    debugger;
    for(let i in pms) {
        let ithSubs = pms[i].split(':');
        let ithNoun = subs[0];
        if(noun === ithNoun ) {
            return pms[i];
        }
    }
}

function setPermission(noun, verbs, user) {
    user = user || this;
    let pms = user.permissions;
    debugger;
    pms.map((ithPm, i) => {
        let ithSubs = ithPm.split(':');
        let ithNoun = subs[0];
        if(noun === ithNoun) {
            ithPm = assemblePermission(ithNoun, verbs);
            console.log('set verbs: '+ pms[i]);
        }
    })
}


/**
 * Permissions have a noun, ';' then one or more verbs.
 * @param noun
 * @param verbs
 * @returns "user_page:view,edit"
 */
function assemblePermission(noun, verbs) {
    return noun + ':' + verbs;
}


//END User store
  module.exports = userStore;