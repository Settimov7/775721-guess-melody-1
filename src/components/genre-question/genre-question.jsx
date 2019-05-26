import * as React from 'react';
import * as PropTypes from 'prop-types';

import {Player} from "../player/player";
import {withAudio} from "../../hocs/with-audio/with-audio";

const AudioPlayer = withAudio(Player);

export class GenreQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {question, onAnswer, activePlayerIndex, onPlayerButtonClick, onChangeUserAnswer} = this.props;
    const {genre, answers} = question;

    return (
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
                <AudioPlayer
                  src={src}
                  isPlaying={activePlayerIndex === index}
                  onPlayerButtonClick={() => onPlayerButtonClick(index)}
                />

                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    onChange={() => onChangeUserAnswer(index)}
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
}

GenreQuestion.propTypes = {
  question: PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  activePlayerIndex: PropTypes.number,
  onPlayerButtonClick: PropTypes.func,
  onChangeUserAnswer: PropTypes.func,
};
