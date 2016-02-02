'use strict';


module.exports = {

    isNo: function isNo(data, session) {
        let lastThreeChars = (session.backlog.slice(-2)+ data).toLowerCase();
        return lastThreeChars === ' no' || lastThreeChars === ',no';
    },

    isChuckedClient: function isChuckedClient(data, session) {
        return session.isChucked;
    }
};