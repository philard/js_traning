'use strict';


(function(exports) {

  function SleepyCow(name) {
    this.name = name || "Anonymous cow";
  }

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