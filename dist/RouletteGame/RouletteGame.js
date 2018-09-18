"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RouletteAnswer = _interopRequireDefault(require("./RouletteAnswer"));

require("../assets/css/RouletteGame.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RouletteGame =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(RouletteGame, _React$PureComponent);

  function RouletteGame(props) {
    var _this;

    _classCallCheck(this, RouletteGame);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RouletteGame).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rotateRoulette", function () {
      if (_this.state.rotating) return;

      _this.setState(function (prevState) {
        return {
          answered: false,
          deg: prevState.deg + Math.round(760 * (Math.random() + 1)),
          rotating: true,
          question: {
            answers: []
          }
        };
      });

      setTimeout(function () {
        _this.setState({
          rotating: false,
          question: _this.props.data.questions[Math.floor(_this.state.deg % 360 / _this.delta)]
        });
      }, 1000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "answerClick", function (idx) {
      if (_this.state.answered) return;

      _this.setState({
        answered: true
      });

      if (_this.props.answerClick) {
        _this.props.answerClick(_this.state.question, idx);
      }
    });

    _this.state = {
      answered: false,
      deg: 0,
      rotating: null,
      question: {
        text: props.data.title,
        answers: []
      }
    };
    _this.delta = 360 / props.data.questions.length;
    return _this;
  }

  _createClass(RouletteGame, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var styles = {
        base: {
          backgroundImage: "url(".concat(this.props.data.baseImage, ")")
        },
        pin: {
          backgroundImage: "url(".concat(this.props.data.pinImage, ")")
        },
        roulette: {
          backgroundImage: "url(".concat(this.props.data.rouletteImage, ")"),
          transform: "rotate(-".concat(this.state.deg, "deg)")
        }
      };
      return _react.default.createElement("div", {
        className: "row unc-roulette-game"
      }, _react.default.createElement("div", {
        className: "col-sm-6"
      }, _react.default.createElement("h3", null, this.state.question.text), this.state.rotating === false && _react.default.createElement("ul", {
        className: (0, _classnames.default)({
          answered: this.state.answered
        })
      }, this.state.question.answers.map(function (answer, idx) {
        return _react.default.createElement(_RouletteAnswer.default, _extends({}, answer, {
          key: idx,
          idx: idx,
          onClick: _this2.answerClick,
          questionAnswered: _this2.state.answered
        }));
      }))), _react.default.createElement("div", {
        className: "col-sm-6"
      }, _react.default.createElement("div", {
        className: "unc-roulette-base",
        style: styles.base
      }, _react.default.createElement("div", {
        className: "unc-roulette",
        style: styles.roulette,
        onClick: this.rotateRoulette
      }), _react.default.createElement("div", {
        className: "unc-roulette-pin",
        style: styles.pin
      }))));
    }
  }]);

  return RouletteGame;
}(_react.default.PureComponent);

var _default = RouletteGame;
exports.default = _default;