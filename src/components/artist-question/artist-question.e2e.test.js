import * as React from 'react';
import {shallow} from 'enzyme';

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

it(`Artist question correctly trigger onAnswer event`, () => {
  const onAnswerMockFunction = jest.fn();
  const props = {
    question: mock.question,
    onAnswer: onAnswerMockFunction,
  };
  const artistQuestion = shallow(<ArtistQuestion {...props} />);
  const questionInputs = artistQuestion.find(`input`);

  questionInputs.forEach((questionInput) => questionInput.simulate(`click`));

  expect(onAnswerMockFunction).toHaveBeenCalledTimes(3);
});

it(`Artist question onClick callback functions have correctly params`, () => {
  const onAnswerMockFunction = jest.fn();
  const props = {
    question: mock.question,
    onAnswer: onAnswerMockFunction,
  };
  const artistQuestion = shallow(<ArtistQuestion {...props} />);
  const questionInputs = artistQuestion.find(`input`);

  questionInputs.forEach((questionInput) => questionInput.simulate(`click`));

  expect(onAnswerMockFunction).toHaveBeenNthCalledWith(1, `John Snow`);

  expect(onAnswerMockFunction).toHaveBeenNthCalledWith(2, `Jack Daniels`);

  expect(onAnswerMockFunction).toHaveBeenNthCalledWith(3, `Jim Beam`);
});
