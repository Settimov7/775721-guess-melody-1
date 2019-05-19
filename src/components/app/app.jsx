import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

import {Welcome} from "../welcome/welcome";
import {GenreQuestionScreen} from "../genre-question-screen/genre-question-screen";
import {ArtistQuestionScreen} from "../artist-question-screen/artist-question-screen";
import {actionCreator} from "../../reducer";

export const App = (props) => {
  const {
    settings,
    questions,
    currentQuestionIndex,
    errorsCount,
    onStartButtonClick,
    onUserAnswer,
    reset,
  } = props;
  const {gameTime, maxErrors} = settings;
  const question = questions[currentQuestionIndex];
  const userAnswerHandler = (userAnswer) => {
    onUserAnswer(question, userAnswer, errorsCount, maxErrors);
  };

  if (!question) {
    if (currentQuestionIndex === questions.length) {
      reset();
    }

    return <Welcome time={gameTime} maxErrors={maxErrors} onStartButtonClick={onStartButtonClick}/>;
  }

  const errors = new Array(errorsCount).fill(null).map((error, index) => (
    <div
      key={index}
      className="wrong"
    />
  ));

  return (
    <section className={`game game--${question.type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{
              filter: `url(#blur)`,
              transform: `rotate(-90deg) scaleY(-1)`,
              transformOrigin: `center`,
            }}/>
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          {errors}
        </div>
      </header>

      {getQuestionScreen(question, userAnswerHandler)}
    </section>
  );
};

const getQuestionScreen = (question, userAnswerHandler) => {
  switch (question.type) {
    case `genre`:
      return <GenreQuestionScreen question={question} onAnswer={userAnswerHandler} key={question.id}/>;

    case `artist`:
      return <ArtistQuestionScreen question={question} onAnswer={userAnswerHandler} key={question.id}/>;

    default:
      return null;
  }
};

App.propTypes = {
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    maxErrors: PropTypes.number.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf([`genre`]).isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired
      })).isRequired
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf([`artist`]).isRequired,
      song: PropTypes.shape({
        artist: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }).isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        picture: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired
      })).isRequired
    }),
  ]
  )).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  errorsCount: PropTypes.number.isRequired,
  onStartButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentQuestionIndex: state.currentQuestionIndex,
  errorsCount: state.errorsCount,
});


const mapDispatchToProps = (dispatch) => ({
  onStartButtonClick: () => dispatch(actionCreator.goToNextQuestion()),
  onUserAnswer: (userAnswer, question, errorsCount, maxErrors) => {
    dispatch(actionCreator.goToNextQuestion());
    dispatch(actionCreator.checkUserAnswer(
        userAnswer,
        question,
        errorsCount,
        maxErrors
    ));
  },
  reset: () => dispatch(actionCreator.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
