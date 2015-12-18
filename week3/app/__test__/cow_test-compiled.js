"use strict";

var _Cow =
    ("../Cow.js");

var _Cow2 = _interopRequireDefault(_Cow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = chai.expect;

describe("Cow", function () {
  describe("constructor", function () {
    it("should have a default name", function () {
      var cow = new _Cow2.default();
      expect(cow.name).to.equal("Anon  cow");
    });

    it("should set cow's name if provided", function () {
      var cow = new _Cow2.default("Kate");
      expect(cow.name).to.equal("Kate");
    });
  });

  describe("#greets", function () {
    it("should throw if no target is passed in", function () {
      expect(function () {
        new _Cow2.default().greets();
      }).to.throw(Error);
    });

    it("should greet passed target", function () {
      var greetings = new _Cow2.default("Kate").greets("Baby");
      expect(greetings).to.equal("Kate greets Baby");
    });
  });
});
