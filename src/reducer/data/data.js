const initialAppState = {
  questions: [],
};

export const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

export const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },
};

export const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, appState, {
        questions: payload,
      });
  }

  return appState;
};
