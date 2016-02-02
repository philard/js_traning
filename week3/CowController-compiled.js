'use strict';

/**
 * Created by Philip_John_Ardley on 25-Nov-15.
 */

CowController = {
  _field: document.getElementById('field'),
  _count: 0,
  createCow: function createCow() {
    var name = 'cow' + CowController._count++;
    var cowModel = new Cow(name);

    var CowEl = document.createElement('div');
    CowEl.addEventListener('click', function (e) {
      CowController._displayGreet(e, cowModel);
    });
    CowEl.innerHTML = name;

    CowController._field.appendChild(CowEl);
  },
  _displayGreet: function _displayGreet(e, cowModel) {
    var cowGreet = cowModel.greets('mouse');
    alert(cowGreet);
  },

  createSleepyCow: function createSleepyCow() {
    var name = 'sleepycow' + CowController._count++;
    var cowModel = new SleepyCow(name);

    var CowEl = document.createElement('div');
    CowEl.addEventListener('click', function (e) {
      CowController._displayLateGreet(e, cowModel);
    });
    CowEl.innerHTML = name;

    CowController._field.appendChild(CowEl);
  },

  _displayLateGreet: function _displayLateGreet(e, sleepyCowModel) {

    var cowGreet = sleepyCowModel.lateGreets('mouse', function (event, sleepyCowGreet) {
      alert(sleepyCowGreet);
    });
  }

};

//# sourceMappingURL=CowController-compiled.js.map