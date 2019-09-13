"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(password) {
  if (password.length < 8) {
    throw new Error("Psssword must be 8 charactors or longer");
  }
  return _bcryptjs2.default.hash(password, 10);
};

exports.default = hashPassword;