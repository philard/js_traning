'use strict';

var handlers = require('../lib/handlers.js');
var chai = chai || require('chai');
var expect = chai.expect;



describe("handlers", function() {
    describe("getRequestHandler", function() {
        it("should return handleQuestionOne", function() {

            let session = {
                backlog:'testname',
                chucked: false,
                favoriteColor: '',
                name: '',
                quest: '',
                questionIndex: 0
            };
            let returnedHandler = handlers.getRequestHandler({}, session, {});
            expect(returnedHandler).to.equal(handlers.handlers.handleQuestionOne);
        });

        it("should return handleQuestionTwo", function() {

            let session = {
                backlog:'testquest',
                chucked: false,
                favoriteColor: '',
                name: 'testname',
                quest: '',
                questionIndex: 1
            };
            let returnedHandler = handlers.getRequestHandler({}, session, {});
            expect(returnedHandler).to.equal(handlers.handlers.handleQuestionTwo);
        });

        it("should return handleQuestionThree", function() {

            let session = {
                backlog:'blue',
                chucked: false,
                favoriteColor: '',
                name: 'testname',
                quest: 'testquest',
                questionIndex: 2
            };
            let returnedHandler = handlers.getRequestHandler({}, session, {});
            expect(returnedHandler).to.equal(handlers.handlers.handleQuestionThree);
        });

        it("should return handleChatMessage", function() {

            let session = {
                backlog:'testmessage',
                chucked: false,
                favoriteColor: '',
                name: 'testname',
                quest: '',
                questionIndex: 3
            };
            let returnedHandler = handlers.getRequestHandler({}, session, {});
            expect(returnedHandler).to.equal(handlers.handlers.handleChatMessage);
        });

        it("should return handleHandlerNotFoundException", function() {

            let session = {
                backlog:'testmessage',
                chucked: false,
                favoriteColor: '',
                name: undefined,
                quest: '',
                questionIndex: 3
            };
            let returnedHandler = handlers.getRequestHandler({}, session, {});
            expect(returnedHandler).to.equal(handlers.handlers.handleHandlerNotFoundException);
        });
    });

    describe(".handlers", function() {
        describe(".handleQuestionOne", function() {
            let req = {};
            let session = {
                backlog: 'testname',
                questionIndex: 0
            };
            let ctx = {
                clients: [],
                questionsThree: ['what, is your name?\r\n', 'what, is your quest?\r\n', 'what, is your favorite color?\r\n']
            };

            let result = handlers.handlers.handleQuestionOne(req, session, ctx);

            it('should return \"' + ctx.questionsThree[1] + '\"', function () {
                expect(result).to.equal(ctx.questionsThree[1]);
            });
            it('should set session\'s name', function () {
                expect(session.name).to.equal('testname');
            });
            it('should set session\'s questionIndex', function () {
                expect(session.questionIndex).to.equal(1);
            });
        });

        describe(".handleQuestionTwo", function() {
            let req = {};
            let session = {
                backlog: 'testquest',
                questionIndex: 1
            };
            let ctx = {
                clients: [],
                questionsThree: ['what, is your name?\r\n', 'what, is your quest?\r\n', 'what, is your favorite color?\r\n']
            };

            let result = handlers.handlers.handleQuestionTwo(req, session, ctx);

            it('should return \"' + ctx.questionsThree[2] +'\"', function () {
                expect(result).to.equal(ctx.questionsThree[2]);
            });
            it('should set session\'s quest', function () {
                expect(session.quest).to.equal('testquest');
            });
            it('should set session\'s questionIndex', function () {
                expect(session.questionIndex).to.equal(2);
            });
        });

        describe(".handleQuestionThree", function() {
            let req = {};
            let session = {
                backlog: 'testcolor',
                questionIndex: 1
            };
            let ctx = {
                clients: [],
                questionsThree: ['what, is your name?\r\n', 'what, is your quest?\r\n', 'what, is your favorite color?\r\n']
            };

            let result = handlers.handlers.handleQuestionThree(req, session, ctx);

            it('should return \"' + 'you may pass\r\n' +'\"', function () {
                expect(result).to.equal('you may pass\r\n');
            });
            it('should set session\'s favoriteColor', function () {
                expect(session.favoriteColor).to.equal('testcolor');
            });
            it('should set session\'s questionIndex', function () {
                expect(session.questionIndex).to.equal(3);
            });
        });


    });
});

