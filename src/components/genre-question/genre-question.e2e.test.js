import * as React from 'react';
import {shallow} from 'enzyme';

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

it(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const onPlayerButtonClick = jest.fn();
  const onChangeUserAnswer = jest.fn();
  const props = {
    question: mock.question,
    onAnswer,
    activePlayerIndex: 0,
    onPlayerButtonClick,
    onChangeUserAnswer,
  };
  const genreQuestion = shallow(<GenreQuestion {...props}/>);
  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Genre question correctly trigger onChange event`, () => {
  const onAnswer = jest.fn();
  const onPlayerButtonClick = jest.fn();
  const onChangeUserAnswer = jest.fn();
  const props = {
    question: mock.question,
    onAnswer,
    activePlayerIndex: 0,
    onPlayerButtonClick,
    onChangeUserAnswer,
  };
  const genreQuestion = shallow(<GenreQuestion {...props}/>);
  const answers = genreQuestion.find(`input`);

  answers.forEach((answer) => answer.simulate(`change`));

  expect(onChangeUserAnswer).toHaveBeenCalledTimes(4);
});

it(`Genre question trigger onChange event with correctly params`, () => {
  const onAnswer = jest.fn();
  const onPlayerButtonClick = jest.fn();
  const onChangeUserAnswer = jest.fn();
  const props = {
    question: mock.question,
    onAnswer,
    activePlayerIndex: 0,
    onPlayerButtonClick,
    onChangeUserAnswer,
  };
  const genreQuestion = shallow(<GenreQuestion {...props}/>);
  const answers = genreQuestion.find(`input`);

  answers.at(0).simulate(`change`);
  answers.at(1).simulate(`change`);
  answers.at(2).simulate(`change`);
  answers.at(3).simulate(`change`);

  expect(onChangeUserAnswer).toHaveBeenNthCalledWith(1, 0);
  expect(onChangeUserAnswer).toHaveBeenNthCalledWith(2, 1);
  expect(onChangeUserAnswer).toHaveBeenNthCalledWith(3, 2);
  expect(onChangeUserAnswer).toHaveBeenNthCalledWith(4, 3);
});
