'use strict';


function User(properties) {
    Object.assign(this, properties);
}
User.prototype.getPermission = getPermission;
User.prototype.setPermission = setPermission;
User.prototype.getParsedPermissions = getParsedPermissions;

function getPermission(noun, user) {
    user = user || this;
    let pms = user.permissions;

    for(let i in pms) {
        let ithSubs = pms[i].split(':');
        let ithNoun = ithSubs[0];
        if(noun === ithNoun ) {
            return pms[i];
        }
    }
}

function getParsedPermissions(user) {
    user = user || this;
    let pms = user.permissions;

    let parsed = pms.map((ithPm, i) => {
        let ithSubs = ithPm.split(':');
        return {noun:ithSubs[0], verbs:ithSubs[1]};
    });
    return parsed;
}


function setPermission(noun, verbs, user) {
    user = user || this;
    let pms = user.permissions;
    let set = false;

    let newPms = pms.map((ithPm, i) => {
        let ithSubs = ithPm.split(':');
        let ithNoun = ithSubs[0];
        if(noun === ithNoun) {
            ithPm = assemblePermission(ithNoun, verbs);
            set = true;
        }
        return ithPm;
    });
    if(!set) {
        newPms.push(assemblePermission(noun, verbs));
    }

    user.permissions = newPms;
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

module.exports = User;