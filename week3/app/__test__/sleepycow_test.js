var expect = chai.expect;

describe("SleepyCow", function() {
  describe("constructor", function() {
    it("should have a default name", function() {
      var cow = new SleepyCow();
      expect(cow.name).to.equal("Anon cow");
    });

    it("should set cow's name if provided", function() {
      var sleepyCow = new SleepyCow("SleepyKate");
      expect(sleepyCow.name).to.equal("SleepyKate");
    });
  });

  describe("#greets", function() {
    it("should throw if no target is passed in", function() {
      expect(function() {
        (new SleepyCow()).greets();
      }).to.throw(Error);
    });

    it("should greet passed target", function() {
      var greetings = (new SleepyCow("SleepyKate")).greets("mouse");
      expect(greetings).to.equal("SleepyKate asynchronously greets mouse");
    });
  });

  describe("#lateGreets", function() {
    it("should pass an error if no target is passed", function(done) {
      (new SleepyCow()).lateGreets(null, function(err, greetings) {
        expect(err).to.be.an.instanceof(Error);
        done();
      });
    });

    it("should greet passed target after one second", function(done) {
      (new SleepyCow("SleepyKate")).lateGreets("mouse", function(err, greetings) {
        expect(greetings).to.equal("SleepyKate asynchronously greets mouse");
        done();
      });
    });
  });
});