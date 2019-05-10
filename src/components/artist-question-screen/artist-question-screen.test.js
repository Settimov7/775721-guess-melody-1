import * as React from 'react';
import renderer from 'react-test-renderer';

import {ArtistQuestionScreen} from "./artist-question-screen";

it(`Artist question screen correctly renders`, () => {
  const props = {
    question: {
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
    onAnswer: jest.fn()
  };

  const tree = renderer.create(<ArtistQuestionScreen {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
