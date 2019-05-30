import {
  reducer,
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
} from "./game";

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      id: 2,
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `correct`,
        },
      ],
    }, `correct`)).toBe(true);

    expect(isArtistAnswerCorrect({
      id: 2,
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `correct`,
        },
      ],
    }, `mistake`)).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect({
      id: 2,
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `blues`,
          src: `path.mp3`,
        },
        {
          genre: `rock`,
          src: `path.mp3`,
        },
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
      ]
    }, [false, false, true, false])).toEqual(true);


    expect(isGenreAnswerCorrect({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `rock`,
          src: `path.mp3`,
        },
        {
          genre: `blues`,
          src: `path.mp3`,
        },
      ]
    }, [false, false, false, false])).toEqual(false);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.goToNextQuestion()).toEqual({
      type: `INCREMENT_CURRENT_QUESTION_INDEX`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `correct`,
        },
      ],
    }, `correct`, 0, 100)).toEqual({
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `correct`,
        },
      ],
    }, `mistake`, 0, 100)).toEqual({
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `blues`,
          src: `path.mp3`,
        },
        {
          genre: `rock`,
          src: `path.mp3`,
        },
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
      ]
    }, [false, false, true, false], 0, 100)).toEqual({
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `blues`,
          src: `path.mp3`,
        },
        {
          genre: `rock`,
          src: `path.mp3`,
        },
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
      ]
    }, [false, true, false, false], 0, 100)).toEqual({
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 1,
    });
  });

  it(`Action creator resets state if user is answered incorrectly and there're no mistakes left`, () => {
    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
        {
          genre: `blues`,
          src: `path.mp3`,
        },
        {
          genre: `rock`,
          src: `path.mp3`,
        },
        {
          genre: `jazz`,
          src: `path.mp3`,
        },
      ]
    }, [false, false, false, false], 2, 3)).toEqual({
      type: `RESET_APP_STATE`,
    });

    expect(ActionCreator.checkUserAnswer({
      id: 2,
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `mistake`,
        },
        {
          picture: `path.jpg`,
          artist: `correct`,
        },
      ],
    }, `mistake`, 2, 3)).toEqual({
      type: `RESET_APP_STATE`,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      currentQuestionIndex: -1,
      errorsCount: 0,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      currentQuestionIndex: -1,
      errorsCount: 0,
    }, {
      type: `INCREMENT_CURRENT_QUESTION_INDEX`,
      payload: 1,
    })).toEqual({
      currentQuestionIndex: 0,
      errorsCount: 0,
    });

    expect(reducer({
      currentQuestionIndex: -1,
      errorsCount: 0,
    }, {
      type: `INCREMENT_CURRENT_QUESTION_INDEX`,
      payload: 0,
    })).toEqual({
      currentQuestionIndex: -1,
      errorsCount: 0,
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      currentQuestionIndex: -1,
      errorsCount: 0,
    }, {
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 1,
    })).toEqual({
      currentQuestionIndex: -1,
      errorsCount: 1,
    });

    expect(reducer({
      currentQuestionIndex: -1,
      errorsCount: 0,
    }, {
      type: `INCREMENT_ERRORS_COUNT`,
      payload: 0,
    })).toEqual({
      currentQuestionIndex: -1,
      errorsCount: 0,
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      currentQuestionIndex: 3,
      errorsCount: 2,
    }, {
      type: `RESET_APP_STATE`,
    })).toEqual({
      currentQuestionIndex: -1,
      errorsCount: 0,
    });
  });
});
