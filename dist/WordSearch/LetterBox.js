"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var LetterBox = function LetterBox(props) {
  var className = (0, _classnames.default)('unc-letter-box', {
    'unc-letter-selected': props.isSelected,
    'unc-letter-fixed': props.isFixed
  });
  return _react.default.createElement("span", {
    className: className,
    onMouseDown: function onMouseDown() {
      props.onMouseDown(props.position);
    },
    onMouseEnter: function onMouseEnter() {
      props.onMouseEnter(props.position);
    },
    onMouseUp: function onMouseUp() {
      props.onMouseUp(props.position);
    }
  }, props.letter);
};

var _default = LetterBox;
exports.default = _default;