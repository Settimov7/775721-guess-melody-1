import * as React from 'react';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import {ArtistQuestion} from "../../components/artist-question/artist-question";
import {GenreQuestion} from "../../components/genre-question/genre-question";
import {withUserAnswer} from "../with-user-answer/with-user-answer";
import {withActivePlayer} from "../with-active-player/with-active-player";
import {Welcome} from "../../components/welcome/welcome";
import {actionCreator} from "../../reducer";

const WrappedGenreQuestion = withUserAnswer(withActivePlayer(GenreQuestion));

export const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);

      this._userAnswerHandler = this._userAnswerHandler.bind(this);
    }

    get _currentQuestion() {
      const {questions, currentQuestionIndex} = this.props;

      return questions[currentQuestionIndex];
    }

    get _screen() {
      const question = this._currentQuestion;

      switch (question.type) {
        case `genre`:
          return <WrappedGenreQuestion question={question} onAnswer={this._userAnswerHandler} key={question.id}/>;

        case `artist`:
          return <ArtistQuestion question={question} onAnswer={this._userAnswerHandler} key={question.id}/>;

        default:
          return null;
      }
    }

    get _errors() {
      const {errorsCount} = this.props;

      return new Array(errorsCount).fill(null).map((error, index) => (
        <div
          key={`error-${index}`}
          className="wrong"
        />
      ));
    }

    render() {
      const {settings, questions, currentQuestionIndex, onStartButtonClick, reset} = this.props;
      const {gameTime, maxErrors} = settings;
      const question = this._currentQuestion;

      if (!question) {
        if (currentQuestionIndex === questions.length) {
          reset();
        }

        return <Welcome time={gameTime} maxErrors={maxErrors} onStartButtonClick={onStartButtonClick}/>;
      }

      return <Component
        {...this.props}
        screen={this._screen}
        errors={this._errors}
        questionType={question.type}
      />;
    }

    _userAnswerHandler(userAnswer) {
      const {onUserAnswer, errorsCount, settings} = this.props;
      const question = this._currentQuestion;

      onUserAnswer(question, userAnswer, errorsCount, settings.maxErrors);
    }
  }

  WithScreenSwitch.propTypes = {
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

  return WithScreenSwitch;
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
