/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import RouletteGame from '../src';
import rouletteData from '../src/assets/js/roulette-game';

import 'bootstrap/dist/css/bootstrap.min.css';

/* eslint-disable no-console */
const answerClick = (question, idx) => {
  console.log(question, idx);
};
/* eslint-enable no-console */

render(
  <RouletteGame data={rouletteData} answerClick={answerClick} />,
  document.getElementById('app')
);
