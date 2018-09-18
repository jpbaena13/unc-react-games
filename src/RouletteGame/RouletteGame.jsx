import React from 'react';

import classNames from 'classnames';

import Answer from './RouletteAnswer';

import '../assets/css/RouletteGame.css';

class RouletteGame extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      deg: 0,
      rotating: null,
      question: { text: props.data.title, answers: [] }
    };

    this.delta = 360 / props.data.questions.length;
  }

  rotateRoulette = () => {
    if (this.state.rotating) return;

    this.setState(prevState => ({
      answered: false,
      deg: prevState.deg + Math.round(760 * (Math.random() + 1)),
      rotating: true,
      question: { answers: [] }
    }));

    setTimeout(() => {
      this.setState({
        rotating: false,
        question: this.props.data.questions[Math.floor((this.state.deg % 360) / this.delta)]
      });
    }, 1000);
  }

  answerClick = (idx) => {
    if (this.state.answered) return;

    this.setState({
      answered: true
    });

    if (this.props.answerClick) {
      this.props.answerClick(this.state.question, idx);
    }
  }

  render() {
    const styles = {
      base: {
        backgroundImage: `url(${this.props.data.baseImage})`
      },
      pin: {
        backgroundImage: `url(${this.props.data.pinImage})`
      },
      roulette: {
        backgroundImage: `url(${this.props.data.rouletteImage})`,
        transform: `rotate(-${this.state.deg}deg)`
      }
    };

    return (
      <div className="row unc-roulette-game">
        <div className="col-sm-6">
          <h3>{this.state.question.text}</h3>
          {this.state.rotating === false
            && <ul className={classNames({ answered: this.state.answered })}>
              {this.state.question.answers.map((answer, idx) => (
                <Answer {...answer} key={idx} idx={idx}
                        onClick={this.answerClick}
                        questionAnswered={this.state.answered}/>
              ))}
            </ul>
          }
        </div>
        <div className="col-sm-6">
          <div className="unc-roulette-base" style={styles.base}>
            <div className="unc-roulette" style={styles.roulette} onClick={this.rotateRoulette} />
            <div className="unc-roulette-pin" style={styles.pin} />
          </div>
        </div>
      </div>
    );
  }
}

export default RouletteGame;
