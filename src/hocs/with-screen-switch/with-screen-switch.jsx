import * as React from 'react';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import {ArtistQuestion} from "../../components/artist-question/artist-question";
import {GenreQuestion} from "../../components/genre-question/genre-question";
import {withUserAnswer} from "../with-user-answer/with-user-answer";
import {withActivePlayer} from "../with-active-player/with-active-player";
import {Welcome} from "../../components/welcome/welcome";
import {getQuestions} from '../../../src/reducer/data/selectors';
import {getCurrentQuestionIndex, getErrorsCount} from '../../../src/reducer/game/selectors';
import {ActionCreator} from "../../reducer/game/game";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen";
import {getIsAuthorizationRequired} from "../../reducer/user/selectors";

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
      const {settings, questions, currentQuestionIndex, onStartButtonClick, reset, isAuthorizationRequired} = this.props;
      const {gameTime, maxErrors} = settings;
      const question = this._currentQuestion;

      if (isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }

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
    questions: PropTypes.array.isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    errorsCount: PropTypes.number.isRequired,
    onStartButtonClick: PropTypes.func.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  questions: getQuestions(state),
  currentQuestionIndex: getCurrentQuestionIndex(state),
  errorsCount: getErrorsCount(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});


const mapDispatchToProps = (dispatch) => ({
  onStartButtonClick: () => dispatch(ActionCreator.goToNextQuestion()),
  onUserAnswer: (userAnswer, question, errorsCount, maxErrors) => {
    dispatch(ActionCreator.goToNextQuestion());
    dispatch(ActionCreator.checkUserAnswer(
        userAnswer,
        question,
        errorsCount,
        maxErrors
    ));
  },
  reset: () => dispatch(ActionCreator.reset()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
