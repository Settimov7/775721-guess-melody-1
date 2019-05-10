import * as React from 'react';
import * as PropTypes from 'prop-types';

import {Welcome} from "../welcome/welcome";
import {GenreQuestionScreen} from "../genre-question-screen/genre-question-screen";
import {ArtistQuestionScreen} from "../artist-question-screen/artist-question-screen";

export class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  _getQuestion(question, onAnswer) {
    const {settings} = this.props;
    const {gameTime, errorsCount} = settings;

    if (!question) {
      return <Welcome time={gameTime} errorsCount={errorsCount} onStartButtonClick={onAnswer}/>;
    }

    switch (question.type) {
      case `genre`:
        return <GenreQuestionScreen question={question} onAnswer={onAnswer}/>;
      case `artist`:
        return <ArtistQuestionScreen question={question} onAnswer={onAnswer}/>;
      default:
        return <Welcome time={gameTime} errorsCount={errorsCount} onStartButtonClick={onAnswer}/>;
    }
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return this._getQuestion(questions[question], () => {
      this.setState((state) => ({
        question: state.question + 1 >= questions.length ? -1 : state.question + 1
      }));
    });
  }
}

App.propTypes = {
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    errorsCount: PropTypes.number.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([`genre`]).isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.oneOf([`rock`, `jazz`, `blues`, `pop`]).isRequired
      })).isRequired
    }),
    PropTypes.shape({
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
  )).isRequired
};
