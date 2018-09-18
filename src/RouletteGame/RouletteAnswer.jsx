import React from 'react';

import classNames from 'classnames';

class Answer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
  }

  handleClick = () => {
    if (this.props.questionAnswered) return;

    this.setState({
      clicked: true
    });

    if (this.props.onClick) this.props.onClick(this.props.idx);
  }

  render() {
    const className = classNames({
      correct: this.props.questionAnswered
                  && (this.props.correct === true
                    || (this.props.correct === undefined && this.state.clicked)),
      error: this.state.clicked && this.props.correct === false
    });

    return (
      <li className={className} onClick={this.handleClick}>
        {this.props.text}
      </li>
    );
  }
}

export default Answer;
