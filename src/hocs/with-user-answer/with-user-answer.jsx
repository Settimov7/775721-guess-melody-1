import * as React from 'react';
import * as PropTypes from "prop-types";

export const withUserAnswer = (Component) => {
  class WithUserAnswer extends React.PureComponent {
    constructor(props) {
      super(props);

      const answersLength = props.question.answers.length;

      this.state = {
        answers: new Array(answersLength).fill(false),
      };

      this._userAnswerChangeHandler = this._userAnswerChangeHandler.bind(this);
      this._UserAnswerHandler = this._UserAnswerHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onAnswer={this._UserAnswerHandler}
        onChangeUserAnswer={this._userAnswerChangeHandler}
      />;
    }

    _userAnswerChangeHandler(index) {
      const answers = [...this.state.answers];

      answers[index] = !answers[index];
      this.setState({
        answers,
      });
    }

    _UserAnswerHandler() {
      this.props.onAnswer(this.state.answers);
    }
  }

  WithUserAnswer.propTypes = {
    question: PropTypes.shape({
      genre: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};
