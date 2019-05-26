import * as React from 'react';
import renderer from 'react-test-renderer';

import {GenreQuestion} from "./genre-question";

const mock = {
  question: {
    id: 2,
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
};

it(`Genre question screen correctly renders`, () => {
  const props = {
    question: mock.question,
    onAnswer: jest.fn(),
    activePlayerIndex: 0,
    onPlayerButtonClick: jest.fn(),
    onChangeUserAnswer: jest.fn(),
  };

  const createNodeMock = () => {
    return {
      focus() {
        return true;
      }
    };
  };

  const tree = renderer.create(<GenreQuestion {...props} />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
