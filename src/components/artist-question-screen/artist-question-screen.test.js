import * as React from 'react';
import renderer from 'react-test-renderer';

import {ArtistQuestionScreen} from "./artist-question-screen";

it(`Artist question screen correctly renders`, () => {
  const props = {
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
    onAnswer: jest.fn()
  };

  const createNodeMock = () => {
    return {
      focus() {
        return true;
      }
    };
  };

  const tree = renderer.create(<ArtistQuestionScreen {...props} />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
