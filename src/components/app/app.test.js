import * as React from 'react';
import renderer from 'react-test-renderer';

import {App} from "./app";

const mock = {
  questions: [
    {
      id: 1,
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `path.mp3`,
          genre: `rock`,
        },
        {
          src: `path.mp3`,
          genre: `pop`,
        },
        {
          src: `path.mp3`,
          genre: `jazz`,
        },
        {
          src: `path.mp3`,
          genre: `rock`,
        },
      ],
    },
    {
      id: 2,
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `John Snow`,
        },
        {
          picture: `path.jpg`,
          artist: `Jack Daniels`,
        },
        {
          picture: `path.jpg`,
          artist: `Jim Beam`,
        },
      ],
    },
  ],
};

it(`App correctly renders`, () => {
  const props = {
    questions: mock.questions,
    settings: {
      gameTime: 5,
      maxErrors: 3,
    },
    currentQuestionIndex: -1,
    errorsCount: 0,
    onStartButtonClick: () => {},
    onUserAnswer: () => {},
    reset: () => {},
  };
  const tree = renderer.create(<App {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
