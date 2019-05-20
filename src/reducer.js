const initialAppState = {
  currentQuestionIndex: -1,
  errorsCount: 0,
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `INCREMENT_CURRENT_QUESTION_INDEX`:
      return Object.assign({}, appState, {
        currentQuestionIndex: appState.currentQuestionIndex + payload,
      });

    case `INCREMENT_ERRORS_COUNT`:
      return Object.assign({}, appState, {
        errorsCount: appState.errorsCount + payload,
      });

    case `RESET_APP_STATE`:
      return Object.assign({}, initialAppState);
  }

  return appState;
};

export const actionCreator = {
  goToNextQuestion: () => ({
    type: `INCREMENT_CURRENT_QUESTION_INDEX`,
    payload: 1,
  }),

  checkUserAnswer: (question, userAnswer, errors, maxErrors) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`:
        isAnswerCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;

      case `artist`:
        isAnswerCorrect = isArtistAnswerCorrect(question, userAnswer);
    }

    if (!isAnswerCorrect && errors + 1 === maxErrors) {
      return {
        type: `RESET_APP_STATE`,
      };
    }

    return {
      type: `INCREMENT_ERRORS_COUNT`,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  reset: () => ({
    type: `RESET_APP_STATE`,
  })
};

export const isGenreAnswerCorrect = (question, userAnswer) => userAnswer.every((item, index) => {
  const {genre, answers} = question;

  return item === (answers[index].genre === genre);
});

export const isArtistAnswerCorrect = (question, userAnswer) => question.song.artist === userAnswer;
