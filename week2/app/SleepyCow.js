// cow.js
(function(exports) {
  "use strict";

  function SleepyCow(name) {
    this.name = name || "Anon cow";
  }
  exports.SleepyCow = SleepyCow;

  SleepyCow.prototype = {
    greets: function(target) {
      if (!target)
        throw new Error("missing target");
      return this.name + " asynchronously greets " + target;
    },
    lateGreets: function(target, callback) {
      setTimeout(function(self) {
        try {
          callback(null, self.greets(target));
        } catch (err) {
          callback(err);
        }
      }, 1000, this);
    }
  };
})(this);