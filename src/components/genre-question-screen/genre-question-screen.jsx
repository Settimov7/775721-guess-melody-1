import * as React from 'react';
import * as PropTypes from 'prop-types';

import {Player} from "../player/player";

export class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const answersLength = this.props.question.answers.length;

    this.state = {
      activePlayerIndex: null,
      answer: new Array(answersLength).fill(false),
    };

    this._onPlayerButtonHandler = this._onPlayerButtonHandler.bind(this);
  }

  render() {
    const {question, onAnswer} = this.props;
    const {genre, answers} = question;
    const {activePlayerIndex, answer} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();

            onAnswer(answer);
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
                  onPlayerButtonClick={() => this._onPlayerButtonHandler(index)}
                />

                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    onChange={() => this._onChangeInputHandler(index)}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            ))
          }
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }

  _onPlayerButtonHandler(index) {
    this.setState({
      activePlayerIndex: this.state.activePlayerIndex === index ? null : index,
    });
  }

  _onChangeInputHandler(index) {
    const answer = [...this.state.answer];

    answer[index] = !answer[index];
    this.setState({
      answer,
    });
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
