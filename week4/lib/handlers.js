'use strict';

let telnetUtils = require('./telnetUtils');


 //getRequestHandler called on a newline. This code is a bit like SpringMVC's request mapping xml file.
exports.getRequestHandler = function getRequestHandler(req, session, ctx) {

    if(session.questionIndex == 0) {
        return handleQuestionOne;
    } else if(session.questionIndex == 1) {
        return handleQuestionTwo;
    } else if(session.questionIndex == 2) {
        return handleQuestionThree;
    } else if(session.questionIndex >= 3) {
        return handleChatMessage;
    }

};


function handleQuestionOne(req, session, ctx) {
    session.name = session.backlog;
    session.questionIndex = 1;
    return ctx.questionsThree[1];
}

function handleQuestionTwo(req, session, ctx) {
    session.quest = session.backlog;
    session.questionIndex = 2;
    return ctx.questionsThree[2];
}

function handleQuestionThree(req, session, ctx) {
    session.favoriteColor = session.backlog;
    session.questionIndex = 3;
    return 'you may pass\r\n';
}

function handleHandlerNotFoundException(req, session, ctx) {
    return '404 - no handler found for you';
}


function handleChatMessage(req, session, ctx) {

    let message = session.name + ' said: ' + session.backlog;

    telnetUtils.emitLineInsertion(req, ctx, message);

    return '';
}





module.exports = exports;