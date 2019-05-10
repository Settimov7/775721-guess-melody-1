import * as React from 'react';
import {mount} from 'enzyme';

import {App} from "./app";

const mock = {
  questions: [
    {
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

it(`On welcome screen on button play click app open first question screen`, () => {
  const props = {
    questions: mock.questions,
    settings: {
      gameTime: 5,
      errorsCount: 3,
    },
  };

  const app = mount(<App {...props} />);
  expect(app.state(`question`)).toEqual(-1);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);
});

it(`On question screen app switch to another question screen`, () => {
  const props = {
    questions: mock.questions,
    settings: {
      gameTime: 5,
      errorsCount: 3,
    },
  };

  const app = mount(<App {...props} />);
  app.setState({
    question: 0
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`submit`);
  app.update();

  expect(app.state(`question`)).toEqual(1);
});

it(`On last question screen answer app switch to welcome screen`, () => {
  const props = {
    questions: mock.questions,
    settings: {
      gameTime: 5,
      errorsCount: 3,
    },
  };

  const app = mount(<App {...props} />);

  app.setState({
    question: props.questions.length - 1
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`change`);
  app.update();

  expect(app.state(`question`)).toEqual(-1);
});
