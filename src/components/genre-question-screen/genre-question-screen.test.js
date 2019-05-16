import * as React from 'react';
import renderer from 'react-test-renderer';

import {GenreQuestionScreen} from "./genre-question-screen";

it(`Genre question screen correctly renders`, () => {
  const props = {
    question: {
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
    onAnswer: jest.fn()
  };

  const createNodeMock = () => {
    return {
      focus() {
        return true;
      }
    };
  };

  const tree = renderer.create(<GenreQuestionScreen {...props} />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
