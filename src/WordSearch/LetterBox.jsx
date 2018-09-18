/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import classNames from 'classnames';

const LetterBox = (props) => {
  const className = classNames('unc-letter-box', {
    'unc-letter-selected': props.isSelected,
    'unc-letter-fixed': props.isFixed
  });

  return (
    <span className={className}
          onMouseDown={() => { props.onMouseDown(props.position); }}
          onMouseEnter={() => { props.onMouseEnter(props.position); }}
          onMouseUp={() => { props.onMouseUp(props.position); }}>
      {props.letter}
    </span>
  );
};

export default LetterBox;
