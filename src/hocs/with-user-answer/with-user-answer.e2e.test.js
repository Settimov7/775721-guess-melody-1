import * as React from 'react';
import {shallow} from 'enzyme';

import {withUserAnswer} from "./with-user-answer";

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

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

it(`Should change answer correctly`, () => {
  const props = {
    question: mock.question,
    onAnswer: jest.fn(),
  };
  const wrappedComponent = shallow(<MockComponentWrapped {...props}/>);

  wrappedComponent.instance()._userAnswerChangeHandler(1);
  wrappedComponent.update();

  expect(wrappedComponent.state().answers).toEqual([false, true, false, false]);
});

it(`onAnswer should have correctly params`, () => {
  const onAnswer = jest.fn();
  const props = {
    question: mock.question,
    onAnswer,
  };
  const wrappedComponent = shallow(<MockComponentWrapped {...props}/>);

  wrappedComponent.instance()._userAnswerChangeHandler(1);
  wrappedComponent.instance()._userAnswerChangeHandler(2);
  wrappedComponent.instance()._userAnswerChangeHandler(1);
  wrappedComponent.instance()._UserAnswerHandler();
  wrappedComponent.update();

  expect(wrappedComponent.state().answers).toEqual([false, false, true, false]);
});
