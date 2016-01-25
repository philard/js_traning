'use strict';

let handlers = {};


/*
 Get request handler for (newline) request. A bit like SpringMVC's request mapping xml file.
 */
handlers.getRequestHandler = function getRequestHandler(req, session, ctx) {
    let requestHandler;
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
    return 'you may pass';
}

function handleHandlerNotFoundException(req, session, ctx) {
    return '404 - no handler found for you';
}

function oldhandleChatMessage(req, session, ctx) {
    ctx.telnetUtils.emit('', session.backlog, req);

    return '> ';//no need for \r\n because the user has just typed return.
}

function handleChatMessage(req, session, ctx) {

    let message = session.backlog;

    ctx.telnetUtils.emitLineInsertion(req, ctx, message);

    return '';
}





module.exports = handlers;