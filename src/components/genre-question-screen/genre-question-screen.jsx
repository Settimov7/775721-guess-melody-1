import * as React from 'react';
import * as PropTypes from 'prop-types';

import {Player} from "../player/player";

export class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayerIndex: null,
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {genre, answers} = question;
    const {activePlayerIndex} = this.state;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{
                filter: `url(#blur)`,
                transform: `rotate(-90deg) scaleY(-1)`,
                transformOrigin: `center`
              }}/>
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"/>
            <div className="wrong"/>
            <div className="wrong"/>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();

              onAnswer();
            }}
          >
            {
              answers.map(({src}, index) => (
                <div
                  key={index}
                  className="track"
                >
                  <Player
                    src={src}
                    isPlaying={activePlayerIndex === index}
                    onPlayerButtonClick={() => this.setState({
                      activePlayerIndex: this.state.activePlayerIndex === index ? null : index,
                    })}
                  />

                  <div className="game__answer">
                    <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`}
                      id={`answer-${index}`} />
                    <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                  </div>
                </div>
              ))
            }
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
