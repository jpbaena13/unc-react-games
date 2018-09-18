import React from 'react';

import LetterBox from './LetterBox';

import '../assets/css/WordSearch.css';

class WordSearch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searching: undefined,
      initialBox: undefined,
      currentBox: undefined
    };

    this.directions = {
      HORIZONTAL: 1,
      VERTICAL: 2,
      DIAGONAL_DOWN: 3,
      DIAGONAL_UP: 4
    };

    this.letters = [];
    this.selectedBoxes = [];
    this.fixedBoxes = []; // Found words.

    this.init();
  }

  /**
   * Initialize each cell from letters array to undefined
   * and add the words to game.
   */
  init = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < this.props.size; i += 1) {
      const row = [];

      for (let j = 0; j < this.props.size; j += 1) {
        row.push(undefined);
      }

      this.letters.push(row);
    }

    this.props.words.split(',').forEach((w) => {
      let word = '';

      // Here's where we reverse the letters
      if (Math.random() * 10 > 5) {
        for (let i = w.length - 1; i >= 0; i -= 1) word += w[i];
      } else {
        word = w;
      }

      this.addWord(word);
    });

    for (let i = 0; i < this.props.size; i += 1) {
      for (let j = 0; j < this.props.size; j += 1) {
        if (this.letters[i][j] === undefined) {
          this.letters[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  /**
   * Place the word on the letters array at suggested location (randomly)
   *
   * @param  {string} word Word to add
   */
  addWord = (word) => {
    const row = Math.floor(Math.random() * this.props.size);
    const col = Math.floor(Math.random() * this.props.size);
    const directionsLength = Object.keys(this.directions).length;
    const direction = Math.ceil(Math.random() * directionsLength);

    if (!this.Populator(row, col, word, direction)) {
      // Didn't get placed.. brute force-fit (if posibble)
      for (let i = 1; i <= directionsLength; i += 1) {
        if (this.Populator(row, col, word, i)) break;
      }
    }
  }

  /**
   * Set of strategies to populate the game.
   *
   * @param  {int} row       Suggested row to place the word
   * @param  {int} col       Suggested col to place the word
   * @param  {string} word   Word to place
   * @param  {int} direction Direction to where the word will be placed
   *
   * @return {boolean}       True if the word was placed, otherwise False.
   */
  Populator = (row, col, word, direction) => {
    let isPlaced = false;

    if (this.willWordFit(row, col, word, direction)) {
      this.writeWord(row, col, word, direction);
      isPlaced = true;
    } else {
      for (let i = 0; i < this.props.size; i += 1) {
        let xRow = (row + i) % this.props.size;
        let xCol = (col + i) % this.props.size;
        let startingPoint = this.findContigousSpace(xRow, xCol, word, direction);

        if (i !== 0 && (direction === this.directions.DIAGONAL_DOWN
            || direction === this.directions.DIAGONAL_UP)) break;

        switch (direction) {
          case this.directions.HORIZONTAL:
            if (startingPoint !== -1) {
              this.writeWord(xRow, startingPoint, word, direction);
              isPlaced = true;
            }
            break;

          case this.directions.VERTICAL:
            if (startingPoint !== -1) {
              this.writeWord(startingPoint, xCol, word, direction);
              isPlaced = true;
            }
            break;

          case this.directions.DIAGONAL_DOWN:
            startingPoint = this.findContigousSpace(row, col, word, direction);

            if (startingPoint[0] === true) {
              this.writeWord(startingPoint[1], startingPoint[2], word, direction);
              isPlaced = true;
            } else {
              const tCol = 0;
              let tRow = (this.props.size - word.length);

              for (; tRow >= 0; tRow -= 1) {
                for (let j = 0; j < 2; j += 1) {
                  xRow = (j === 0) ? tRow : tCol;
                  xCol = (j === 0) ? tCol : tRow;
                  startingPoint = this.findContigousSpace(xRow, xCol, word, direction);

                  if (startingPoint[0] === true) {
                    this.writeWord(startingPoint[1], startingPoint[2], word, direction);
                    isPlaced = true;
                    break;
                  }
                }
                if (isPlaced) break;
              }
            }
            break;

          case this.directions.DIAGONAL_UP:
            startingPoint = this.findContigousSpace(row, col, word, direction);

            if (startingPoint[0] === true) {
              this.writeWord(startingPoint[1], startingPoint[2], word, direction);
              isPlaced = true;
            } else {
              const tCol = this.props.size - 1;
              let tRow = (this.props.size - word.length);

              for (; tRow >= 0; tRow -= 1) {
                for (let j = 0; j < 2; j += 1) {
                  xRow = (j === 0) ? tRow : this.props.size - 1 - tCol;
                  xCol = (j === 0) ? tCol : this.props.size - 1 - tRow;
                  startingPoint = this.findContigousSpace(xRow, xCol, word, direction);

                  if (startingPoint[0] === true) {
                    this.writeWord(startingPoint[1], startingPoint[2], word, direction);
                    isPlaced = true;
                    break;
                  }
                }
                if (isPlaced) break;
              }
            }
            break;

          default: break;
        }
        break;
      }
    }

    return isPlaced;
  }

  /**
   * Checks if the word will fit in the given location by (row, col)
   *
   * @params
   * @see Populator method
   *
   * @return {[type]}           True if the word fits in the given location, otherwise False
   */
  willWordFit = (row, col, word, direction) => {
    let isFree = false;
    let freeCounter = 0;
    let tRow = row;
    let tCol = col;
    let i = 0;

    switch (direction) {
      case this.directions.HORIZONTAL:
        for (i = col; i < this.props.size; i += 1) {
          if (this.letters[row][i] === undefined || this.letters[row][i] === word[i]) {
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

      case this.directions.VERTICAL:
        for (i = row; i < this.props.size; i += 1) {
          if (this.letters[i][col] === undefined || this.letters[i][col] === word[i]) {
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

      case this.directions.DIAGONAL_DOWN:
        while (tCol < this.props.size && tRow < this.props.size) {
          if (this.letters[tRow][tCol] === undefined || this.letters[tRow][tCol] === word[i]) {
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

      case this.directions.DIAGONAL_UP:
        while (tRow >= 0 && tCol < this.props.size) {
          if (this.letters[tRow][tCol] === undefined || this.letters[tRow][tCol] === word[i]) {
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

      default: break;
    }

    return isFree;
  }

  /**
   * Sets the word on the letters array at given location by (row, col)
   *
   * @params
   * @see Populator method
   */
  writeWord = (row, col, word, direction) => {
    switch (direction) {
      case this.directions.HORIZONTAL:
        for (let i = 0; i < word.length; i += 1) {
          this.letters[row][col + i] = word[i];
        }
        break;

      case this.directions.VERTICAL:
        for (let i = 0; i < word.length; i += 1) {
          this.letters[row + i][col] = word[i];
        }
        break;

      case this.directions.DIAGONAL_DOWN:
        for (let i = 0; i < word.length; i += 1) {
          this.letters[row + i][col + i] = word[i];
        }
        break;

      case this.directions.DIAGONAL_UP:
        for (let i = 0; i < word.length; i += 1) {
          this.letters[row - i][col + i] = word[i];
        }
        break;

      default: break;
    }
  }

  /**
   * Checks if there is contiguous space anywhere on this line.
   *
   * @params
   * @see Populator method
   *
   * @return {int/boolean}           Int or Array with [0] as boolean if there is a contiguous
   *                                 space where to place the word. Otherwhise -1 or false in [0]
   */
  findContigousSpace = (row, col, word, direction) => {
    let freeLocation = -1;
    let freeCounter = 0;
    let tRow = row;
    let tCol = col;
    let i = 0;

    switch (direction) {
      case this.directions.HORIZONTAL:
        for (i = 0; i < this.props.size; i += 1) {
          if (this.letters[row][i] === undefined || this.letters[row][i] === word[i]) {
            freeCounter += 1;
            if (freeCounter === word.length) {
              freeLocation = (i - (word.length - 1));
              break;
            }
          } else {
            freeCounter = 0;
          }
        }
        break;

      case this.directions.VERTICAL:
        for (i = 0; i < this.props.size; i += 1) {
          if (this.letters[i][col] === undefined || this.letters[i][col] === word[i]) {
            freeCounter += 1;
            if (freeCounter === word.length) {
              freeLocation = (i - (word.length - 1));
              break;
            }
          } else {
            freeCounter = 0;
          }
        }
        break;

      case this.directions.DIAGONAL_DOWN:
        while (tRow > 0 && tCol > 0) {
          tRow -= 1;
          tCol -= 1;
        }

        while (freeLocation === -1 && tRow !== this.props.size && tCol !== this.props.size) {
          if (this.letters[tRow][tCol] === undefined || this.letters[tRow][tCol] === word[i]) {
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

      case this.directions.DIAGONAL_UP:
        while (tRow < (this.props.size - 1) && tCol > 0) {
          tRow += 1;
          tCol -= 1;
        }

        while (freeLocation === -1 && tRow !== 0 && tCol !== this.props.size) {
          if (this.letters[tRow][tCol] === undefined || this.letters[tRow][tCol] === word[i]) {
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

      default: break;
    }

    return freeLocation;
  }

  /**
   * Mouse down on letter box
   */
  onMouseDown = (position) => {
    if (this.state.searching !== undefined) return;

    this.setState({
      searching: true,
      initialBox: { i: position.i, j: position.j },
      currentBox: { i: position.i, j: position.j }
    });
  }

  /**
   * Mouse enter on letter box when the click is pressed.
   */
  onMouseEnter = (position) => {
    if (!this.state.searching) return;

    this.setState({
      currentBox: { i: position.i, j: position.j }
    });
  }

  /**
   * Mouse up event. What's the last box?
   */
  onMouseUp = () => {
    this.setState({
      searching: false
    });
  }

  /**
   * Search given position in the selectedBoxes array
   * @param  {Object} position Position to search
   * @return {boolean}          True if the position object is in the array, otherwise False.
   */
  isSelected = (position) => {
    for (let i = 0; i < this.selectedBoxes.length; i += 1) {
      if (position.i === this.selectedBoxes[i].i
          && position.j === this.selectedBoxes[i].j) {
        return true;
      }
    }

    return false;
  }

  /**
   * Search given position in the fixedBoxes array
   * @param  {Object} position Position to search
   * @return {boolean}          True if the position object is in the array, otherwise False.
   */
  isFixed = (position) => {
    for (let i = 0; i < this.fixedBoxes.length; i += 1) {
      if (position.i === this.fixedBoxes[i].i
          && position.j === this.fixedBoxes[i].j) {
        return true;
      }
    }

    return false;
  }

  /**
   * Lifecycle method
   */
  componentDidUpdate() {
    if (this.state.searching === false) {
      let word = '';
      let iword = '';
      const { length } = this.selectedBoxes;

      for (let i = 0; i < length; i += 1) {
        const position = this.selectedBoxes[i];
        const iposition = this.selectedBoxes[length - i - 1];
        word += this.letters[position.j][position.i];
        iword += this.letters[iposition.j][iposition.i];
      }

      this.props.words.split(',').forEach((w) => {
        if (w === word || w === iword) {
          this.fixedBoxes = [...this.fixedBoxes, ...this.selectedBoxes];
          if (this.props.foundWord) this.props.foundWord(w);
        }
      });

      setTimeout(() => {
        this.selectedBoxes = [];
        this.setState({
          searching: undefined
        });
      }, 1000);
    }
  }

  /**
   * Render method
   */
  render() {
    if (this.state.searching) this.selectedBoxes = [];

    return (
      <div className="unc-word-search">
        {this.wordList}
        { this.letters.map((row, rowIdx) => (
          <div className='unc-word-search-row' key={rowIdx}>
            {row.map((letter, idx) => {
              let isSelected = false;
              let isFixed = false;
              const position = { i: idx, j: rowIdx };

              if (this.state.searching) {
                const maxI = Math.max(this.state.initialBox.i, this.state.currentBox.i);
                const minI = Math.min(this.state.initialBox.i, this.state.currentBox.i);
                const maxJ = Math.max(this.state.initialBox.j, this.state.currentBox.j);
                const minJ = Math.min(this.state.initialBox.j, this.state.currentBox.j);

                if (maxJ === minJ
                    && position.j === maxJ
                    && position.i >= minI
                    && position.i <= maxI) {
                  this.selectedBoxes.push(position);
                  isSelected = true;
                }

                if (maxI === minI
                    && position.i === maxI
                    && position.j >= minJ
                    && position.j <= maxJ) {
                  this.selectedBoxes.push(position);
                  isSelected = true;
                }

                if ((maxI - minI) === (maxJ - minJ)
                    && position.i >= minI && position.i <= maxI
                    && position.j >= minJ && position.j <= maxJ
                    && ((position.i - this.state.initialBox.i)
                        === (position.j - this.state.initialBox.j)
                      || (position.i - this.state.initialBox.i)
                      === (this.state.initialBox.j - position.j))) {
                  this.selectedBoxes.push(position);
                  isSelected = true;
                }
              } else {
                isSelected = this.isSelected(position);
              }

              isFixed = this.isFixed(position);

              return (
                <LetterBox letter={letter} position={position} key={`${idx}-${rowIdx}`}
                           onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
                           onMouseEnter={this.onMouseEnter} isSelected={isSelected}
                           isFixed={isFixed} />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

WordSearch.defaultProps = {
  size: 16
};

export default WordSearch;
