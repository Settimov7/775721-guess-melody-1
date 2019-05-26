import * as React from 'react';
import renderer from 'react-test-renderer';

import {ArtistQuestion} from "./artist-question";

const mock = {
  question: {
    id: 1,
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
    song: {
      src: `path.mp3`,
    },
  },
};

it(`Artist question screen correctly renders`, () => {
  const props = {
    question: mock.question,
    onAnswer: jest.fn()
  };

  const createNodeMock = () => {
    return {
      focus() {
        return true;
      }
    };
  };

  const tree = renderer.create(<ArtistQuestion {...props} />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
