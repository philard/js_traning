'use strict';

let telnetUtils = require('./telnetUtils');


 //getRequestHandler called on a newline. This code is a bit like SpringMVC's request mapping xml file.
let handlers = {};
handlers.getRequestHandler = function getRequestHandler(req, session, ctx) {

    if(session.questionIndex == 0) {
        return handlers.handlers.handleQuestionOne;
    } else if(session.questionIndex == 1) {
        return handlers.handlers.handleQuestionTwo;
    } else if(session.questionIndex == 2) {
        return handlers.handlers.handleQuestionThree;
    } else if(session.questionIndex >= 3 && typeof session.name !== 'undefined') {
        return handlers.handlers.handleChatMessage;
    } else {
        return handlers.handlers.handleHandlerNotFoundException;
    }

};

handlers.handlers = {};
handlers.handlers.handleQuestionOne = function(req, session, ctx) {
    session.name = session.backlog;
    session.questionIndex = 1;
    return ctx.questionsThree[1];
};

handlers.handlers.handleQuestionTwo = function(req, session, ctx) {
    session.quest = session.backlog;
    session.questionIndex = 2;
    return ctx.questionsThree[2];
};

handlers.handlers.handleQuestionThree = function(req, session, ctx) {
    session.favoriteColor = session.backlog;
    session.questionIndex = 3;
    return 'you may pass\r\n';
};

handlers.handlers.handleChatMessage = function(req, session, ctx) {

    let message = session.name + ' said: ' + session.backlog;

    telnetUtils.emitLineInsertion(req, ctx, message);

    return '';
};

handlers.handlers.handleHandlerNotFoundException = function(req, session, ctx) {
    return '404 - no handler found for you';
};


module.exports = handlers;