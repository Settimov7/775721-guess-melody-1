import * as React from 'react';
import renderer from 'react-test-renderer';

import {App} from "./app";

it(`Welcome correctly renders`, () => {
  const props = {
    gameTime: 5,
    errorsCount: 3,
  };
  const tree = renderer.create(<App {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
