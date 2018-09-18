"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LetterBox = _interopRequireDefault(require("./LetterBox"));

require("../assets/css/WordSearch.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WordSearch =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WordSearch, _React$PureComponent);

  function WordSearch(props) {
    var _this;

    _classCallCheck(this, WordSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WordSearch).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "init", function () {
      var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      for (var i = 0; i < _this.props.size; i += 1) {
        var row = [];

        for (var j = 0; j < _this.props.size; j += 1) {
          row.push(undefined);
        }

        _this.letters.push(row);
      }

      _this.props.words.split(',').forEach(function (w) {
        var word = ''; // Here's where we reverse the letters

        if (Math.random() * 10 > 5) {
          for (var _i = w.length - 1; _i >= 0; _i -= 1) {
            word += w[_i];
          }
        } else {
          word = w;
        }

        _this.addWord(word);
      });

      for (var _i2 = 0; _i2 < _this.props.size; _i2 += 1) {
        for (var _j = 0; _j < _this.props.size; _j += 1) {
          if (_this.letters[_i2][_j] === undefined) {
            _this.letters[_i2][_j] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addWord", function (word) {
      var row = Math.floor(Math.random() * _this.props.size);
      var col = Math.floor(Math.random() * _this.props.size);
      var directionsLength = Object.keys(_this.directions).length;
      var direction = Math.ceil(Math.random() * directionsLength);

      if (!_this.Populator(row, col, word, direction)) {
        // Didn't get placed.. brute force-fit (if posibble)
        for (var i = 1; i <= directionsLength; i += 1) {
          if (_this.Populator(row, col, word, i)) break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "Populator", function (row, col, word, direction) {
      var isPlaced = false;

      if (_this.willWordFit(row, col, word, direction)) {
        _this.writeWord(row, col, word, direction);

        isPlaced = true;
      } else {
        for (var i = 0; i < _this.props.size; i += 1) {
          var xRow = (row + i) % _this.props.size;
          var xCol = (col + i) % _this.props.size;

          var startingPoint = _this.findContigousSpace(xRow, xCol, word, direction);

          if (i !== 0 && (direction === _this.directions.DIAGONAL_DOWN || direction === _this.directions.DIAGONAL_UP)) break;

          switch (direction) {
            case _this.directions.HORIZONTAL:
              if (startingPoint !== -1) {
                _this.writeWord(xRow, startingPoint, word, direction);

                isPlaced = true;
              }

              break;

            case _this.directions.VERTICAL:
              if (startingPoint !== -1) {
                _this.writeWord(startingPoint, xCol, word, direction);

                isPlaced = true;
              }

              break;

            case _this.directions.DIAGONAL_DOWN:
              startingPoint = _this.findContigousSpace(row, col, word, direction);

              if (startingPoint[0] === true) {
                _this.writeWord(startingPoint[1], startingPoint[2], word, direction);

                isPlaced = true;
              } else {
                var tCol = 0;
                var tRow = _this.props.size - word.length;

                for (; tRow >= 0; tRow -= 1) {
                  for (var j = 0; j < 2; j += 1) {
                    xRow = j === 0 ? tRow : tCol;
                    xCol = j === 0 ? tCol : tRow;
                    startingPoint = _this.findContigousSpace(xRow, xCol, word, direction);

                    if (startingPoint[0] === true) {
                      _this.writeWord(startingPoint[1], startingPoint[2], word, direction);

                      isPlaced = true;
                      break;
                    }
                  }

                  if (isPlaced) break;
                }
              }

              break;

            case _this.directions.DIAGONAL_UP:
              startingPoint = _this.findContigousSpace(row, col, word, direction);

              if (startingPoint[0] === true) {
                _this.writeWord(startingPoint[1], startingPoint[2], word, direction);

                isPlaced = true;
              } else {
                var _tCol = _this.props.size - 1;

                var _tRow = _this.props.size - word.length;

                for (; _tRow >= 0; _tRow -= 1) {
                  for (var _j2 = 0; _j2 < 2; _j2 += 1) {
                    xRow = _j2 === 0 ? _tRow : _this.props.size - 1 - _tCol;
                    xCol = _j2 === 0 ? _tCol : _this.props.size - 1 - _tRow;
                    startingPoint = _this.findContigousSpace(xRow, xCol, word, direction);

                    if (startingPoint[0] === true) {
                      _this.writeWord(startingPoint[1], startingPoint[2], word, direction);

                      isPlaced = true;
                      break;
                    }
                  }

                  if (isPlaced) break;
                }
              }

              break;

            default:
              break;
          }

          break;
        }
      }

      return isPlaced;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "willWordFit", function (row, col, word, direction) {
      var isFree = false;
      var freeCounter = 0;
      var tRow = row;
      var tCol = col;
      var i = 0;

      switch (direction) {
        case _this.directions.HORIZONTAL:
          for (i = col; i < _this.props.size; i += 1) {
            if (_this.letters[row][i] === undefined || _this.letters[row][i] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                isFree = true;
                break;
              }
            } else {
              break;
            }
          }

          break;

        case _this.directions.VERTICAL:
          for (i = row; i < _this.props.size; i += 1) {
            if (_this.letters[i][col] === undefined || _this.letters[i][col] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                isFree = true;
                break;
              }
            } else {
              break;
            }
          }

          break;

        case _this.directions.DIAGONAL_DOWN:
          while (tCol < _this.props.size && tRow < _this.props.size) {
            if (_this.letters[tRow][tCol] === undefined || _this.letters[tRow][tCol] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                isFree = true;
                break;
              }
            } else {
              break;
            }

            i += 1;
            tRow += 1;
            tCol += 1;
          }

          break;

        case _this.directions.DIAGONAL_UP:
          while (tRow >= 0 && tCol < _this.props.size) {
            if (_this.letters[tRow][tCol] === undefined || _this.letters[tRow][tCol] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                isFree = true;
                break;
              }
            } else {
              break;
            }

            i += 1;
            tRow -= 1;
            tCol += 1;
          }

          break;

        default:
          break;
      }

      return isFree;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "writeWord", function (row, col, word, direction) {
      switch (direction) {
        case _this.directions.HORIZONTAL:
          for (var i = 0; i < word.length; i += 1) {
            _this.letters[row][col + i] = word[i];
          }

          break;

        case _this.directions.VERTICAL:
          for (var _i3 = 0; _i3 < word.length; _i3 += 1) {
            _this.letters[row + _i3][col] = word[_i3];
          }

          break;

        case _this.directions.DIAGONAL_DOWN:
          for (var _i4 = 0; _i4 < word.length; _i4 += 1) {
            _this.letters[row + _i4][col + _i4] = word[_i4];
          }

          break;

        case _this.directions.DIAGONAL_UP:
          for (var _i5 = 0; _i5 < word.length; _i5 += 1) {
            _this.letters[row - _i5][col + _i5] = word[_i5];
          }

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "findContigousSpace", function (row, col, word, direction) {
      var freeLocation = -1;
      var freeCounter = 0;
      var tRow = row;
      var tCol = col;
      var i = 0;

      switch (direction) {
        case _this.directions.HORIZONTAL:
          for (i = 0; i < _this.props.size; i += 1) {
            if (_this.letters[row][i] === undefined || _this.letters[row][i] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                freeLocation = i - (word.length - 1);
                break;
              }
            } else {
              freeCounter = 0;
            }
          }

          break;

        case _this.directions.VERTICAL:
          for (i = 0; i < _this.props.size; i += 1) {
            if (_this.letters[i][col] === undefined || _this.letters[i][col] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                freeLocation = i - (word.length - 1);
                break;
              }
            } else {
              freeCounter = 0;
            }
          }

          break;

        case _this.directions.DIAGONAL_DOWN:
          while (tRow > 0 && tCol > 0) {
            tRow -= 1;
            tCol -= 1;
          }

          while (freeLocation === -1 && tRow !== _this.props.size && tCol !== _this.props.size) {
            if (_this.letters[tRow][tCol] === undefined || _this.letters[tRow][tCol] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                freeLocation = true;
              }
            } else {
              freeCounter = 0;
            }

            i += 1;
            tRow += 1;
            tCol += 1;
          }

          if (freeLocation) {
            tRow -= word.length;
            tCol -= word.length;
          }

          return [freeLocation, tRow, tCol];

        case _this.directions.DIAGONAL_UP:
          while (tRow < _this.props.size - 1 && tCol > 0) {
            tRow += 1;
            tCol -= 1;
          }

          while (freeLocation === -1 && tRow !== 0 && tCol !== _this.props.size) {
            if (_this.letters[tRow][tCol] === undefined || _this.letters[tRow][tCol] === word[i]) {
              freeCounter += 1;

              if (freeCounter === word.length) {
                freeLocation = true;
              }
            } else {
              freeCounter = 0;
            }

            i += 1;
            tRow -= 1;
            tCol += 1;
          }

          if (freeLocation) {
            tRow += word.length;
            tCol -= word.length;
          }

          return [freeLocation, tRow, tCol];

        default:
          break;
      }

      return freeLocation;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseDown", function (position) {
      if (_this.state.searching !== undefined) return;

      _this.setState({
        searching: true,
        initialBox: {
          i: position.i,
          j: position.j
        },
        currentBox: {
          i: position.i,
          j: position.j
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseEnter", function (position) {
      if (!_this.state.searching) return;

      _this.setState({
        currentBox: {
          i: position.i,
          j: position.j
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseUp", function () {
      _this.setState({
        searching: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSelected", function (position) {
      for (var i = 0; i < _this.selectedBoxes.length; i += 1) {
        if (position.i === _this.selectedBoxes[i].i && position.j === _this.selectedBoxes[i].j) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isFixed", function (position) {
      for (var i = 0; i < _this.fixedBoxes.length; i += 1) {
        if (position.i === _this.fixedBoxes[i].i && position.j === _this.fixedBoxes[i].j) {
          return true;
        }
      }

      return false;
    });

    _this.state = {
      searching: undefined,
      initialBox: undefined,
      currentBox: undefined
    };
    _this.directions = {
      HORIZONTAL: 1,
      VERTICAL: 2,
      DIAGONAL_DOWN: 3,
      DIAGONAL_UP: 4
    };
    _this.letters = [];
    _this.selectedBoxes = [];
    _this.fixedBoxes = []; // Found words.

    _this.init();

    return _this;
  }
  /**
   * Initialize each cell from letters array to undefined
   * and add the words to game.
   */


  _createClass(WordSearch, [{
    key: "componentDidUpdate",

    /**
     * Lifecycle method
     */
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.state.searching === false) {
        var word = '';
        var iword = '';
        var length = this.selectedBoxes.length;

        for (var i = 0; i < length; i += 1) {
          var position = this.selectedBoxes[i];
          var iposition = this.selectedBoxes[length - i - 1];
          word += this.letters[position.j][position.i];
          iword += this.letters[iposition.j][iposition.i];
        }

        this.props.words.split(',').forEach(function (w) {
          if (w === word || w === iword) {
            _this2.fixedBoxes = _toConsumableArray(_this2.fixedBoxes).concat(_toConsumableArray(_this2.selectedBoxes));
            if (_this2.props.foundWord) _this2.props.foundWord(w);
          }
        });
        setTimeout(function () {
          _this2.selectedBoxes = [];

          _this2.setState({
            searching: undefined
          });
        }, 1000);
      }
    }
    /**
     * Render method
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.searching) this.selectedBoxes = [];
      return _react.default.createElement("div", {
        className: "unc-word-search"
      }, this.wordList, this.letters.map(function (row, rowIdx) {
        return _react.default.createElement("div", {
          className: "unc-word-search-row",
          key: rowIdx
        }, row.map(function (letter, idx) {
          var isSelected = false;
          var isFixed = false;
          var position = {
            i: idx,
            j: rowIdx
          };

          if (_this3.state.searching) {
            var maxI = Math.max(_this3.state.initialBox.i, _this3.state.currentBox.i);
            var minI = Math.min(_this3.state.initialBox.i, _this3.state.currentBox.i);
            var maxJ = Math.max(_this3.state.initialBox.j, _this3.state.currentBox.j);
            var minJ = Math.min(_this3.state.initialBox.j, _this3.state.currentBox.j);

            if (maxJ === minJ && position.j === maxJ && position.i >= minI && position.i <= maxI) {
              _this3.selectedBoxes.push(position);

              isSelected = true;
            }

            if (maxI === minI && position.i === maxI && position.j >= minJ && position.j <= maxJ) {
              _this3.selectedBoxes.push(position);

              isSelected = true;
            }

            if (maxI - minI === maxJ - minJ && position.i >= minI && position.i <= maxI && position.j >= minJ && position.j <= maxJ && (position.i - _this3.state.initialBox.i === position.j - _this3.state.initialBox.j || position.i - _this3.state.initialBox.i === _this3.state.initialBox.j - position.j)) {
              _this3.selectedBoxes.push(position);

              isSelected = true;
            }
          } else {
            isSelected = _this3.isSelected(position);
          }

          isFixed = _this3.isFixed(position);
          return _react.default.createElement(_LetterBox.default, {
            letter: letter,
            position: position,
            key: "".concat(idx, "-").concat(rowIdx),
            onMouseDown: _this3.onMouseDown,
            onMouseUp: _this3.onMouseUp,
            onMouseEnter: _this3.onMouseEnter,
            isSelected: isSelected,
            isFixed: isFixed
          });
        }));
      }));
    }
  }]);

  return WordSearch;
}(_react.default.PureComponent);

WordSearch.defaultProps = {
  size: 16
};
var _default = WordSearch;
exports.default = _default;