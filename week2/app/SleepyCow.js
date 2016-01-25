'use strict';
var SleepyCow = (function() {

  function SleepyCow(name) {
    this.name = name || "Anon cow";
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
  return SleepyCow;
})();


if(typeof exports !== 'undefined') exports.default = SleepyCow; //Assigning to default because otherwise Cow would be called binded to undefined, causing an error.
