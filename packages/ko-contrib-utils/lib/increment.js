(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['knockout'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('knockout'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.knockout);
    global.increment = mod.exports;
  }
})(this, function (_knockout) {
  'use strict';

  var _knockout2 = _interopRequireDefault(_knockout);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  _knockout2.default.observable.fn.increment = function () {
    var amt = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    this(this() + amt);
  };

  _knockout2.default.observable.fn.decrement = function () {
    var amt = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    this(this() - amt);
  };
});