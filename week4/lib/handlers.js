'use strict';

let handlers = {};
module.exports = handlers;

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

function handleChatMessage() {
    ctx.clients.emit('',chunk,sock);//TOOTOTOTODOODOODOOD
}

function handleChatMessageRequest(req, session, ctx) {
    return 'todo...';
}