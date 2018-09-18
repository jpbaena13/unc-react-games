/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import RouletteGame from '../src/RouletteGame';
import rouletteData from '../src/assets/js/RouletteGame';

import WordSearch from '../src/WordSearch';

/* eslint-disable no-console */
const answerClick = (question, idx) => {
  console.log(question, idx);
};

const foundWord = (word) => {
  console.log(word);
};
/* eslint-enable no-console */

render(
  <div>
    <RouletteGame data={rouletteData} answerClick={answerClick} />
    <WordSearch words='juan,pablo,baena,zuluaga' size={8} foundWord={foundWord} />
  </div>,
  document.getElementById('app')
);
