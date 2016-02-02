'use strict';

var Cow = (function() {

  function Cow(name) {
    this.name = name || "Anon cow";
  }

  Cow.prototype = {
    greets: function(target) {
      if (!target)
        throw new Error("missing target");
      return this.name + " greets " + target;
    }
  };

  return Cow;
})();


if(typeof exports !== 'undefined') exports.default = Cow; //Assigning to default because otherwise Cow would be called binded to undefined, causing an error.
